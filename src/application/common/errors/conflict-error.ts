import { HttpStatusCode } from "../constants";
import { ClientError } from "./client-error";

export class ConflictError extends ClientError {
  constructor(message: string, ip: string, meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.Conflict,
      true,
      "error.api.conflict",
      meta
    );
  }
}
