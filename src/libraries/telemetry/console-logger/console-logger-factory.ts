import { LoggerFactory } from "../logger-factory";
import { ConsoleLogger } from "./console-logger";
import { Logger } from "../logger";

export class ConsoleLoggerFactory implements LoggerFactory {
  createLogger(name: string): Logger {
    return new ConsoleLogger(name);
  }
}
