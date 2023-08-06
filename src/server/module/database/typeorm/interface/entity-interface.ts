import { DataSource, ObjectLiteral, Repository } from "typeorm";

export interface TypeormRegisterRepository<T extends ObjectLiteral> {
  repositoryNameContainer: string;
  getRepository: (dataSource: DataSource) => Repository<T>;
}
