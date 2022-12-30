/* istanbul ignore file */
import { Logger } from "./logger";

export abstract class LoggerFactory {
  abstract createLogger(name: string): Logger;
}
