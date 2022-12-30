import YAML from 'yamljs';
import { YamlConfigFetcher } from "../fetcher/yaml-config-fetcher";
import { ProcessConfigFetcher } from "../fetcher/process-config-fetcher";

describe('Config Fetchers - Unit Tests', () => {
  describe('YAML Config Fetcher', () => {
    test('When fetching configs from YAML, expect to use constructor path and return object loaded without changes',
      () => {
        const testPath = 'testPath.yaml';
        const testFileContent = {
          DATA: 'TEST'
        };
        type YAMLType = { load: () => any };
        const yamlLoadSpy = jest.spyOn(<YAMLType><unknown>YAML, 'load').mockReturnValue(testFileContent);

        const yamlFetcher = new YamlConfigFetcher(testPath);
        const config = yamlFetcher.fetch();

        expect(yamlLoadSpy).toBeCalledWith(testPath);
        expect(config).toMatchObject(testFileContent);
      });
  });

  describe('ProcessEnv Config Fetcher', () => {
    test('When fetching configs from process.env, expect to return object loaded without changes', () => {
      const processConfigFetcher = new ProcessConfigFetcher();
      const configs = processConfigFetcher.fetch();

      // @ts-ignore
      expect(configs).toMatchObject(process.env);
    })
  })
})
