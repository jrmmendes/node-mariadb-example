/* istanbul ignore file */
export type RawConfigurationObject = { [key: string]: unknown };
export abstract class ConfigFetcher {
  abstract fetch(): RawConfigurationObject;
}
