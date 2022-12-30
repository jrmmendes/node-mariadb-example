import { ConfigFetcher } from "./config-fetcher";

export class ProcessConfigFetcher implements ConfigFetcher {
  fetch() {
    return process.env;
  }
}
