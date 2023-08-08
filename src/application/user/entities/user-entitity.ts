import {
  Column,
  DataSource,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
} from "typeorm";

import { TypeormRegisterRepository } from "../../../server";
import { Authentication, AuthenticationProviders } from "../../authentication";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Unique(["email"])
  @Index()
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @OneToMany(() => Authentication, (authentication) => authentication.user, {
    cascade: true,
  })
  authentication: Authentication[];

  constructor(dependencies?: {
    id?: number;
    email?: string;
    password?: string;
    name?: string;
    lastName?: string;
    age?: number;
  }) {
    dependencies?.id && (this.id = dependencies?.id);
    dependencies?.email && (this.email = dependencies?.email);
    dependencies?.password && (this.password = dependencies?.password);
    dependencies?.name && (this.name = dependencies?.name);
    dependencies?.lastName && (this.lastName = dependencies?.lastName);
    dependencies?.age && (this.age = dependencies?.age);
  }

  initAuthenticationEmailProvider(
    authentication: Authentication = new Authentication({
      provider: AuthenticationProviders.email,
    })
  ) {
    this.authentication = [authentication];
  }
}

export type UserTypeormRepository = Repository<User>;

class UserRegisterRepository implements TypeormRegisterRepository<User> {
  readonly repositoryNameContainer;

  constructor(dependencies: { name: string }) {
    this.repositoryNameContainer = dependencies.name;
  }

  getRepository(dataSource: DataSource): UserTypeormRepository {
    return dataSource.getRepository(User);
  }
}

export const userRegisterRepository = new UserRegisterRepository({
  name: "userTypeormRepository",
});
