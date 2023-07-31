import { NextFunction, Request, Response } from "express";

import { SchemasConfig } from "../../common";

export interface Controller {
  run(req: Request, res: Response, next: NextFunction): Promise<void>;
  schema(): SchemasConfig | null;
}
