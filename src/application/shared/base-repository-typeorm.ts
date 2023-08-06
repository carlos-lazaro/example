import {
  DeleteResult,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from "typeorm";

import { PaginationDto } from "./dto";

export class BaseRepositoryTypeorm<T extends ObjectLiteral> {
  protected readonly repository;

  constructor(dependencies: { repository: Repository<T> }) {
    this.repository = dependencies.repository;
  }

  async Get({ page, limit }: PaginationDto): Promise<[T[], number]> {
    return await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async GetOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async Create(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async Delete(id: number): Promise<number> {
    return await this.repository
      .delete(id)
      .then((value: DeleteResult) => {
        return value.affected ? value.affected : 0;
      })
      .catch(() => {
        return 0;
      });
  }

  async Update(entity: T, id: number): Promise<number> {
    return await this.repository
      .update(id, entity)
      .then((value: UpdateResult) => {
        return value.affected ? value.affected : 0;
      })
      .catch(() => {
        return 0;
      });
  }
}
