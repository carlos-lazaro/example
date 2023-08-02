import { FindOneOptions } from "typeorm";

import { Pagination } from "../common/entities";
import { User, UserId } from "./entities";
import { UserRepository, UserService } from "./interfaces";

export class UserServiceImplement implements UserService {
  private readonly userRepository;

  constructor(dependencies: { userRepository: UserRepository }) {
    this.userRepository = dependencies.userRepository;
  }

  async create(user: User): Promise<UserId> {
    return await this.userRepository.create(user);
  }

  async delete(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }

  async get(pagination: Pagination): Promise<[UserId[], number]> {
    return await this.userRepository.get(pagination);
  }

  async getBy(options: FindOneOptions<UserId>): Promise<UserId | null> {
    return await this.userRepository.getBy(options);
  }

  async update(user: UserId): Promise<UserId | null> {
    return await this.userRepository.update(user);
  }
}
