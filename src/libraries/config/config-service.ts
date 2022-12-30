import { inject } from "inversify";
import { plainToInstance } from "class-transformer";
import { validateSync, ValidationError } from "class-validator";
import { Environment } from "./environment";
import { ConsoleLogger, Logger } from "../telemetry";
import { ConfigFetcher } from "./fetcher/config-fetcher";

export class ConfigService {
  private readonly variables: Environment;
  private readonly logger: Logger;

  constructor(
    @inject(ConfigFetcher)
    private readonly fetcher: ConfigFetcher,
  ) {
    this.logger = new ConsoleLogger("Service: Config");
    this.fetcher = fetcher;

    const rawVariables = this.fetcher.fetch();

    const variables = plainToInstance(Environment, rawVariables);

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
    this.logger.info('Environment variables validation finished with sucess')
    this.variables = variables;
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return JSON.stringify(
      errors.map(({ property, constraints }) => ({ property, constraints }))
    )
  }

  get env() {
    return this.variables;
  }
}
