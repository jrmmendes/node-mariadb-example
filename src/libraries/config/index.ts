import { ContainerModule, decorate, injectable } from "inversify";
import { join } from "path";

import { ConfigFetcher } from "./fetcher/config-fetcher";
import { YamlConfigFetcher } from "./fetcher/yaml-config-fetcher";
import { ConfigService } from "./config-service";

decorate(injectable(), ConfigService);
export const config = new ContainerModule(bind => {
  const configFetcher = new YamlConfigFetcher(join(process.cwd(), 'environment.yaml'));
  try {
    const configService = new ConfigService(configFetcher);
    bind(ConfigService).toConstantValue(configService);
  } catch (e) {
    process.exit(-1);
  }
})

export { ConfigFetcher, RawConfigurationObject } from './fetcher/config-fetcher'
export { ProcessConfigFetcher } from './fetcher/process-config-fetcher'
export { YamlConfigFetcher } from './fetcher/yaml-config-fetcher'
export { ConfigService } from './config-service'
export { Environment } from './environment'

