import { inject } from "inversify";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ConfigService } from "../config";

export class RepositoryFactory<Entity extends ObjectLiteral> implements RepositoryFactory<Entity> {

  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService
  ) {
    this.config = config;
  }

  createRepository(datasourceName: 'mariadb', target: EntityTarget<Entity>): Repository<Entity> {
    return this.config.datasources[datasourceName].getRepository(target)
  }
}
