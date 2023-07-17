export interface ConnectionDatabase {
  connect: () => Promise<void>;
}
