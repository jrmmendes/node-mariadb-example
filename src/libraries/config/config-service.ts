import { inject } from "inversify";
import { plainToInstance } from "class-transformer";
import { validateSync, ValidationError } from "class-validator";
import { Environment } from "./environment";
import { ConsoleLogger, Logger } from "../telemetry";
import { ConfigFetcher } from "./fetcher/config-fetcher";
import { DataSource } from "typeorm";

export class ConfigService {
  private readonly variables: Environment;
  private readonly logger: Logger;

  public readonly datasources: {
    mariadb: DataSource
  }

  constructor(
    @inject(ConfigFetcher)
    private readonly fetcher: ConfigFetcher,
  ) {
    this.logger = new ConsoleLogger("Service: Config");
    this.fetcher = fetcher;

    const rawVariables = this.fetcher.fetch();

    const variables = plainToInstance(Environment, rawVariables);

    this.validate(variables);

    const {
      DB_HOST: host,
      DB_PORT: port,
      DB_USER: username,
      DB_PASSWORD: password,
      DB_NAME: database,
    } = variables;

    this.datasources = {
      mariadb: new DataSource({
        type: "mariadb",
        host,
        port,
        username,
        password,
        database,
        entities: ["src/**/*.entity.ts"],
        migrations: ["src/migrations/*.ts"],
        poolSize: 5,
      })
    };

    this.logger.info('Environment variables validation finished with success')
    this.variables = variables;
  }

  private validate(variables: Environment) {
    const validationErrors = validateSync(variables, {
      forbidUnknownValues: true,
    })

    if (validationErrors.length > 0) {
      this.logger.error(
        'Missing or invalid environment variables:',
        this.formatValidationErrors(validationErrors)
      );
      throw new Error('Invalid environment variables');
    }
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return JSON.stringify(
      errors.map(({ property, constraints }) => ({ property, constraints }))
    )
  }

  get env() {
    return this.variables;
  }

  get datasourcesList() {
    return Object.values(this.datasources);
  }
}
