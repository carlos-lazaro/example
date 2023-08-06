import {
  Column,
  DataSource,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";

import { TypeormRegisterRepository } from "../../../server";
import { User } from "../../user";

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column()
  @Index()
  providerId: string;

  @Column()
  @Index()
  userId: number;

  @ManyToOne(() => User, (user) => user.authentication)
  @JoinColumn({ name: "userId" })
  user: User;

  constructor(dependencies?: {
    id?: number;
    provider?: string;
    providerId?: string;
    userId?: number;
    user?: User;
  }) {
    dependencies?.id && (this.id = dependencies?.id);
    dependencies?.provider && (this.provider = dependencies?.provider);
    dependencies?.providerId && (this.providerId = dependencies?.providerId);
    dependencies?.userId && (this.userId = dependencies?.userId);
    dependencies?.user && (this.user = dependencies?.user);
  }
}

export type AuthenticationTypeormRepository = Repository<Authentication>;

class AuthenticationRegisterRepository
  implements TypeormRegisterRepository<Authentication>
{
  readonly repositoryNameContainer;

  constructor(dependencies: { name: string }) {
    this.repositoryNameContainer = dependencies.name;
  }

  getRepository(dataSource: DataSource): AuthenticationTypeormRepository {
    return dataSource.getRepository(Authentication);
  }
}

export const authenticationRegisterRepository =
  new AuthenticationRegisterRepository({
    name: "authenticationTypeormRepository",
  });
