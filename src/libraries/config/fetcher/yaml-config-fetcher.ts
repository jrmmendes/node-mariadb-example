import { ConfigFetcher } from "./config-fetcher";
import YAML from 'yamljs';

export class YamlConfigFetcher implements ConfigFetcher {
  constructor(private readonly path: string) {
    this.path = path;
  }
  fetch() {
    return YAML.load(this.path);
  }
}
