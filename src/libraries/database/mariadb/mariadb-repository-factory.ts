import { inject } from "inversify";
import { MariadbDataSource } from "./mariadb-datasource";
import { EntityTarget, ObjectLiteral } from "typeorm";
import { MariadbRepository } from "./mariadb-repository";
import { Repository } from "../repository";
import { RepositoryFactory } from "../repository-factory";

export class MariadbRepositoryFactory<Entity extends ObjectLiteral> implements RepositoryFactory<Entity> {

  constructor(
    @inject(MariadbDataSource)
    private readonly datasource: MariadbDataSource
  ) {
    this.datasource = datasource;
  }

  createRepository(target: EntityTarget<Entity>): Repository<Entity> {
    return new MariadbRepository(
      this.datasource.getRepository(target)
    );
  }
}
