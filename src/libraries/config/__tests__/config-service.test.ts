///<reference path="../../../../node_modules/@types/jest/index.d.ts"/>
import 'reflect-metadata';
import { ConfigService } from "../config-service";
import { Environment } from "../environment";

describe('Configuration Service - Unit Tests', function () {
  const mockFetcher = {
    fetch: jest.fn()
  };

  test('When all required environment returned from fetcher, expect env to be valid Environment instance', () => {
    mockFetcher.fetch.mockReturnValue(<Environment>{
      NODE_ENV: 'QA',
      PORT: 2000,
      DB_USER: 'testuser',
      DB_PASSWORD: 'testpass',
      DB_PORT: 21323,
      DB_HOST: 'testhost',
      DB_NAME: 'testdb',
      DB_POOL_CONNECTION_LIMIT: 4,
    });
    const configService = new ConfigService(mockFetcher);
    expect(configService.env).toBeInstanceOf(Environment);
  });

  test('When return from fetcher has missing variables, expect to throw error', () => {
    mockFetcher.fetch.mockReturnValue({});
    expect(() => new ConfigService(mockFetcher)).toThrow();
  })
});
