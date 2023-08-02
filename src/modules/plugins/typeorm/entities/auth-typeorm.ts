import * as Awilix from "awilix";
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";

import { DependencyContainer } from "../../../dependency-injection";
import { User } from "./user-typeorm";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  accessToken: string;

  @Column({ type: "varchar", nullable: true })
  refreshToken: string;

  @Column("simple-array", { nullable: true })
  passwordRecord: string[];

  @OneToOne(() => User, (user) => user.auth, { onDelete: "CASCADE" })
  user: User;
}

export type AuthTypeormRepository = Repository<Auth>;

export const getAuthTypeormRepository = (
  container: Awilix.AwilixContainer<DependencyContainer>
) => {
  return container.resolve("database").appDataSource.getRepository(Auth);
};
