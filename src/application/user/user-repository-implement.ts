import { DeleteResult, FindOneOptions } from "typeorm";

import { UserTypeormRepository } from "../../modules";
import { Pagination } from "../common/entities";
import { User, UserId } from "./entities";
import { UserRepository } from "./interfaces";

export class UserRepositoryImplement implements UserRepository {
  private readonly userModel;

  constructor(dependencies: { userTypeormRepository: UserTypeormRepository }) {
    this.userModel = dependencies.userTypeormRepository;
  }

  async create(user: User): Promise<UserId> {
    return await this.userModel.save({
      ...user,
      auth: { passwordRecord: [user.password] },
    });
  }

  async delete(id: number): Promise<number> {
    return await this.userModel
      .delete(id)
      .then((value: DeleteResult) => {
        return value.affected ? value.affected : 0;
      })
      .catch(() => {
        return 0;
      });
  }

  async get({ page, limit }: Pagination): Promise<[UserId[], number]> {
    return await this.userModel.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getBy(options: FindOneOptions<UserId>): Promise<UserId | null> {
    return await this.userModel.findOne(options);
  }

  async update(user: UserId): Promise<UserId | null> {
    const userDb = await this.getBy({ where: { id: user.id } });

    if (!userDb) return null;

    const userMerge = { ...userDb, ...user };

    return await this.userModel.save(userMerge);
  }
}
