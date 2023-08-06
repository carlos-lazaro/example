import { FindOneOptions } from "typeorm";

import { generatePasswordHash } from "../../server";
import { PaginationDto } from "../shared";
import { UserDto } from "./dtos";
import { User } from "./entities";
import { UserRepository, UserService } from "./interfaces";

export class UserServiceImplement implements UserService {
  private readonly userRepository;

  constructor(dependencies: { userRepository: UserRepository }) {
    this.userRepository = dependencies.userRepository;
  }

  async create(user: User): Promise<User> {
    user.password = await generatePasswordHash(user.password);

    return await this.userRepository.create(user);
  }

  async createExcludeFields(
    user: User,
    toExclude: (keyof User)[] = UserDto.fieldsToExlcude
  ): Promise<Partial<User>> {
    const userDb = await this.create(user);

    return this.cleanUser(userDb, toExclude);
  }

  async delete(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }

  async get(pagination: PaginationDto): Promise<[User[], number]> {
    return await this.userRepository.get(pagination);
  }

  async getExcludeFields(
    pagination: PaginationDto,
    toExclude: (keyof User)[] = UserDto.fieldsToExlcude
  ): Promise<[Partial<User>[], number]> {
    const [users, count] = await this.userRepository.get(pagination);

    if (users.length === 0) return [users, count];

    const usersPartial = users.map((user) =>
      UserDto.excludeFields(user, toExclude)
    );

    return [usersPartial, count];
  }

  async getByOptions(options: FindOneOptions<User>): Promise<User | null> {
    return await this.userRepository.getByOptions(options);
  }

  async getByOptionsExcludeFields(
    options: FindOneOptions<User>,
    toExclude: (keyof User)[] = UserDto.fieldsToExlcude
  ): Promise<Partial<User> | null> {
    const userDb = await this.userRepository.getByOptions(options);

    return this.evaluateAndCleanUser(userDb, toExclude);
  }

  async update(user: User, id: number): Promise<User | null> {
    const userShadown: Partial<User> = { ...user };
    delete userShadown.password;
    const userToUpdate = new User({ ...user });

    return await this.userRepository.update(userToUpdate, id);
  }

  async updateExcludeFields(
    user: User,
    id: number,
    toExclude: (keyof User)[] = UserDto.fieldsToExlcude
  ): Promise<Partial<User> | null> {
    const userDb = await this.update(user, id);

    return this.evaluateAndCleanUser(userDb, toExclude);
  }

  async updatePassword(user: User, id: number): Promise<User | null> {
    if (user.password)
      user.password = await generatePasswordHash(user.password);

    return await this.userRepository.update(user, id);
  }

  async updatePasswordExcludeFields(
    user: User,
    id: number,
    toExclude: (keyof User)[] = UserDto.fieldsToExlcude
  ): Promise<Partial<User> | null> {
    const userDb = await this.updatePassword(user, id);

    return this.evaluateAndCleanUser(userDb, toExclude);
  }

  private evaluateAndCleanUser(userDb: User | null, toExclude: (keyof User)[]) {
    if (!userDb) return null;

    return this.cleanUser(userDb, toExclude);
  }

  private cleanUser(userDb: User, toExclude: (keyof User)[]) {
    const userPartial = UserDto.excludeFields(userDb, toExclude);

    return userPartial;
  }
}
