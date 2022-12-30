import { Logger, LogLevel } from "../logger";

export class ConsoleLogger implements Logger {
  constructor(private readonly name: string) {
    this.name = name;
  }

  log<Args extends Array<unknown>>(level: LogLevel, message: string, ...args: Args): void {
    const logLevelToConsoleMethod = {
      [LogLevel.ERROR]: console.error,
      [LogLevel.WARN]: console.warn,
      [LogLevel.INFO]: console.log,
    };

    const method = logLevelToConsoleMethod[level];
    method(`[${ this.name }] ` + message, ...args);
  }

  error<Args extends Array<unknown>>(message: string, ...args: Args): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  info<Args extends Array<unknown>>(message: string, ...args: Args): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn<Args extends Array<unknown>>(message: string, ...args: Args): void {
    this.log(LogLevel.WARN, message, ...args);
  }
}
