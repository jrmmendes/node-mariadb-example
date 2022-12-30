import { ContainerModule, decorate, injectable } from "inversify";
import { LoggerFactory } from "./logger-factory";
import { ConsoleLoggerFactory } from "./console-logger/console-logger-factory";

decorate(injectable(), LoggerFactory);
decorate(injectable(), ConsoleLoggerFactory);
export const telemetry = new ContainerModule(bind => {
  bind(LoggerFactory).to(ConsoleLoggerFactory).inSingletonScope()
})

export { Logger, LogLevel } from './logger';
export { ConsoleLogger } from './console-logger/console-logger';
export { LoggerFactory } from './logger-factory'
