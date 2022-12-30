
import { ObjectLiteral, Repository as TypeOrmRepository } from "typeorm";
import { Repository } from "../repository";

export class MariadbRepository<Entity extends ObjectLiteral> implements Repository<Entity>{

  constructor(private readonly typeOrmRepository: Promise<TypeOrmRepository<Entity>>) {
    this.typeOrmRepository = typeOrmRepository;
  }

  async save(entity: Entity) {
    await this.typeOrmRepository.then(repository => repository.save(entity));
  }

  async find() {
    return this.typeOrmRepository.then(repository => repository.find());
  }
}
