import { ContainerModule, decorate, injectable } from "inversify";
import { RepositoryFactory } from "./repository-factory";

decorate(injectable(), RepositoryFactory)

export const database = new ContainerModule(bind => {
  bind(RepositoryFactory).to(RepositoryFactory).inSingletonScope();
});
