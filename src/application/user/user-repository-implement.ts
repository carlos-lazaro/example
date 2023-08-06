import { FindOneOptions } from "typeorm";

import { BaseRepositoryTypeorm, PaginationDto } from "../shared";
import { User, UserTypeormRepository } from "./entities";
import { UserRepository } from "./interfaces";

export class UserRepositoryImplement
  extends BaseRepositoryTypeorm<User>
  implements UserRepository
{
  constructor(dependencies: { userTypeormRepository: UserTypeormRepository }) {
    super({ repository: dependencies.userTypeormRepository });
  }

  async create(user: User): Promise<User> {
    return await super.Create(user);
  }

  async delete(id: number): Promise<number> {
    return await super.Delete(id);
  }

  async get(paginationDto: PaginationDto): Promise<[User[], number]> {
    return await super.Get(paginationDto);
  }

  async getByOptions(options: FindOneOptions<User>): Promise<User | null> {
    return await super.GetOne(options);
  }

  async update(user: User, id: number): Promise<User | null> {
    const userDb = await this.GetOne({ where: { id: id } });

    if (!userDb) return null;

    const userMerge = { ...userDb, ...user };

    return await this.repository.save(userMerge);
  }
}
