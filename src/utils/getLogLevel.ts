import { LogLevel } from '@nestjs/common';

export const getLogLevels = (): LogLevel[] => {
  if (process.env.NODE_ENV === 'production') {
    return ['log', 'error'];
  }
  return ['error', 'warn', 'log', 'debug'];
};
