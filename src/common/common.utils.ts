export const randomInteger = (min: number, max: number): number => {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const sleepSeconds = async (seconds: number): Promise<void> => {
  const delaySeconds = Math.abs(Math.trunc(seconds));
  const delayMilliseconds = delaySeconds * 1000;

  return new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
};

export const sleepRandomSeconds = async (
  min: number = 1,
  max: number = 5,
): Promise<void> => sleepSeconds(randomInteger(min, max));
