import * as Awilix from "awilix";
import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";

import { DependencyContainer } from "../../../dependency-injection";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
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
