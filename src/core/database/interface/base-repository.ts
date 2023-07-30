export interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: number, entity: T): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  paginate(
    page: number,
    pageSize: number
  ): Promise<{ rows: T[]; count: number }>;
}
