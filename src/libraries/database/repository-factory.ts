/* istanbul ignore file */

import { Repository } from "./repository";

export abstract class RepositoryFactory<Entity> {
  abstract createRepository(...options: unknown[]): Repository<Entity>
}
