import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import { inject } from "inversify";
import { ConfigService } from "../../config";
import { Logger, LoggerFactory } from "../../telemetry";

export class MariadbDataSource {
  private readonly datasource: DataSource;
  private readonly logger: Logger;
  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
    @inject(LoggerFactory) loggerFactory: LoggerFactory,
  ) {
    this.config = config;
    this.logger = loggerFactory.createLogger('Datasource: MariaDB');
    const {
      DB_HOST: host,
      DB_PORT: port,
      DB_USER: username,
      DB_PASSWORD: password,
      DB_NAME: database,
    } = this.config.env;

    this.datasource = new DataSource({
      type: "mariadb",
      host,
      port,
      username,
      password,
      database,
      entities: ["src/**/*.entity.ts"],
      poolSize: 5,
    });
  }

  async init() {
    try {
      this.logger.info('Connection started')
      await this.datasource.initialize();
      this.logger.info('Connection created with sucess')
    } catch(error) {
      this.logger.error('Error when connecting to database. %s', JSON.stringify(error));
    }
  }

  async getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>) {
    return this.datasource.getRepository<Entity>(target);
  }
}
