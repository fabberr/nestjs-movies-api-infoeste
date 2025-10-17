import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AddressInfo } from 'net';
import { Logger } from '@nestjs/common';

const OpenApiReferenceEndpoint: string = '/api';

const isAddressInfo = (address: unknown): address is AddressInfo => {
  return typeof address === "object" && address !== null && "port" in address;
};

const _logger = new Logger('Bootstrap');

const logHttpServerInformation = (app: NestExpressApplication) => {

    const addressInfo = app.getHttpServer().address();

    if (isAddressInfo(addressInfo) === false) {
      _logger.warn('Unable to obtain server address information');
      return;
    }

    const { address, port } = addressInfo;

    const baseAddress = `http://${address === '::' ? 'localhost' : address}:${port}`;

    _logger.log(`HTTP server listening on port ${port}`);
    _logger.log(`API Reference (OpenAPI): ${baseAddress}${OpenApiReferenceEndpoint}`);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const openApiConfig = new DocumentBuilder()
    .setTitle('Movies API')
    .setVersion('1')
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);

  app.use(
    OpenApiReferenceEndpoint,
    apiReference({
      content: openApiDocument,
      title: 'Movies API Reference',
      defaultHttpClient: {
        targetKey: 'shell',
        clientKey: 'curl',
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000, () => logHttpServerInformation(app));
}
bootstrap();
