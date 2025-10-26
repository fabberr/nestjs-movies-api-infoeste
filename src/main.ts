import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AddressInfo } from 'net';
import { Logger } from '@nestjs/common';
import { Defaults, Routes } from './common/common.constants';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

const isAddressInfo = (address: unknown): address is AddressInfo => {
  return typeof address === 'object' && address !== null && 'port' in address;
};

const logEnvironment = () => {
  const logger = new Logger('Environment');

  logger.log(`DATASOURCE=${process.env.DATASOURCE || Defaults.DATASOURCE}`);
  logger.log(`THROTTLE_DATABASE=${process.env.THROTTLE_DATABASE || false}`);
};

const logServerInfo = (app: NestExpressApplication) => {
  const logger = new Logger('Server');

  const addressInfo = app.getHttpServer().address();

  if (isAddressInfo(addressInfo) === false) {
    logger.warn('Unable to obtain server address information');
    return;
  }

  const { address, port } = addressInfo;

  const baseAddress = `http://${address === '::' ? 'localhost' : address}:${port}`;

  logger.log(`HTTP server listening on port ${port}`);
  logger.log(`API Reference (OpenAPI): ${baseAddress}${Routes.API_REFERENCE}`);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const openApiConfig = new DocumentBuilder()
    .setTitle('Movies API')
    .setVersion('1')
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);

  app.use(
    Routes.API_REFERENCE,
    apiReference({
      content: openApiDocument,
      title: 'Movies API Reference',
      defaultHttpClient: {
        targetKey: 'shell',
        clientKey: 'curl',
      },
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(process.env.PORT ?? Defaults.PORT, () => {
    logEnvironment();
    logServerInfo(app);
  });
}
bootstrap();
