import { FindOneOptions } from "typeorm";

import { BaseRepositoryTypeorm, PaginationDto } from "../shared";
import { Authentication, AuthenticationTypeormRepository } from "./entities";
import { AuthenticationRepository } from "./interfaces";

export class AuthenticationRepositoryImplement
  extends BaseRepositoryTypeorm<Authentication>
  implements AuthenticationRepository
{
  constructor(dependencies: {
    authenticationTypeormRepository: AuthenticationTypeormRepository;
  }) {
    super({ repository: dependencies.authenticationTypeormRepository });
  }

  async Create(authentication: Authentication): Promise<Authentication> {
    return await super.Create(authentication);
  }

  async Delete(id: number): Promise<number> {
    return await super.Delete(id);
  }

  async Get(paginationDto: PaginationDto): Promise<[Authentication[], number]> {
    return await super.Get(paginationDto);
  }

  async getByOptions(
    options: FindOneOptions<Authentication>
  ): Promise<Authentication | null> {
    return await super.GetOne(options);
  }

  async Update(authentication: Authentication, id: number): Promise<number> {
    return await super.Update(authentication, id);
  }
}
