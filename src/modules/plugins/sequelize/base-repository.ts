import { Model, ModelStatic } from "sequelize";

import { User } from "../../../domain";
import { Repository } from "../../../interfaces/database/interface/base-repository";

export abstract class BaseRepository<T extends Model<User, any>>
  implements Repository<T>
{
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async create(entity: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  // async create(entity: Partial<T>): Promise<T> {
  //   return this.model.create(entity);
  // }

  // async create(entity: Omit<T, keyof T["_creationAttributes"]>): Promise<T> {
  //   return this.model.create(entity);
  // }

  // async create(entity: Partial<T["_creationAttributes"]>): Promise<T> {
  //   return this.model.create(entity);
  // }

  async update(id: number, entity: T): Promise<T | null> {
    throw new Error("Method not implemented.");
  }

  // async update(id: number, entity: Partial<T>): Promise<T | null> {
  //   const foundEntity = await this.model.findByPk(id);
  //   if (foundEntity) {
  //     return foundEntity.update(entity);
  //   }
  //   return null;
  // }

  async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  // async delete(id: number): Promise<boolean> {
  //   const deletedRowCount = await this.model.destroy({ where: { id } });
  //   return deletedRowCount > 0;
  // }

  async paginate(
    page: number,
    pageSize: number
  ): Promise<{ rows: T[]; count: number }> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const rows = await this.model.findAll({ offset, limit });
    const count = await this.model.count();

    return { rows, count };
  }
}
