/* istanbul ignore file */
export abstract class Repository<Entity> {
  abstract find(): Promise<Entity[]>;
  abstract save(entity: Entity): Promise<void>
}
