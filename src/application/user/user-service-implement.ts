import { Pagination } from "../common/entities";
import { User, UserId } from "./entities";
import { UserRepository, UserService } from "./interfaces";

export class UserServiceImplement implements UserService {
  private readonly userRepository;

  constructor(dependencies: { userRepository: UserRepository }) {
    this.userRepository = dependencies.userRepository;
  }

  async get(pagination: Pagination): Promise<[User[], number]> {
    return await this.userRepository.get(pagination);
  }

  async getById(id: number): Promise<User | null> {
    return await this.userRepository.getById(id);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  async update(user: UserId): Promise<UserId | null> {
    return await this.userRepository.update(user);
  }

  async delete(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }
}
