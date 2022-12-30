/* istanbul ignore file */
export enum LogLevel {
  INFO,
  WARN,
  ERROR,
}

export abstract class Logger {
  abstract info<Args extends Array<unknown>>(message: string, ...args: Args): void;
  abstract warn<Args extends Array<unknown>>(message: string, ...args: Args): void;
  abstract error<Args extends Array<unknown>>(message: string, ...args: Args): void;
  abstract log<Args extends Array<unknown>>(level: LogLevel, message: string, ...args: Args): void;
}
