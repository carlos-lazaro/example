import * as Awilix from "awilix";
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
} from "typeorm";

import { DependencyContainer } from "../../../dependency-injection";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Unique(["email"])
  @Index()
  email: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastName: string;

  @Column({ type: "int" })
  age: number;
}

export type UserTypeormRepository = Repository<User>;

export const getUserTypeormRepository = (
  container: Awilix.AwilixContainer<DependencyContainer>
) => {
  return container.resolve("database").appDataSource.getRepository(User);
};
