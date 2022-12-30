import { ContainerModule, decorate, injectable } from "../../ioc";
import { MariadbDataSource } from "./mariadb/mariadb-datasource";
import { MariadbRepositoryFactory } from "./mariadb/mariadb-repository-factory";
import { RepositoryFactory } from "./repository-factory";

decorate(injectable(), MariadbDataSource)
decorate(injectable(), MariadbRepositoryFactory)
decorate(injectable(), RepositoryFactory)
export const database = new ContainerModule(bind => {
  bind(MariadbDataSource).toSelf().inSingletonScope();
  bind(RepositoryFactory).to(MariadbRepositoryFactory).inSingletonScope();
});
