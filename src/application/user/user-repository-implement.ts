import { UserTypeormRepository } from "../../modules";
import { Pagination } from "../common/entities";
import { User, UserId } from "./entities";
import { UserRepository } from "./interfaces";

export class UserRepositoryImplement implements UserRepository {
  private readonly userModel;

  constructor(dependencies: { userTypeormRepository: UserTypeormRepository }) {
    this.userModel = dependencies.userTypeormRepository;
  }

  async create(user: User): Promise<User> {
    return await this.userModel.save(user);
  }

  async getById(id: number): Promise<User | null> {
    return await this.userModel.findOne({ where: { id: id } });
  }

  async get({ page, limit }: Pagination): Promise<[User[], number]> {
    return await this.userModel.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async update(user: UserId): Promise<UserId | null> {
    const userDb = await this.getById(user.id);

    if (!userDb) return null;

    const userMerge = { ...userDb, ...user };

    return await this.userModel.save(userMerge);
  }

  async delete(id: number): Promise<number> {
    return await this.userModel
      .delete(id)
      .then((value) => {
        return value.affected ? value.affected : 0;
      })
      .catch(() => {
        return 0;
      });
  }
}
