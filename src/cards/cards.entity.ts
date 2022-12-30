import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CardsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
