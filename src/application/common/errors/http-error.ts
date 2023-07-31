import { HttpStatusCode } from "../constants";
import { BaseError } from "./base-error";

export class HttpError extends BaseError {
  constructor(
    message: string,
    status: HttpStatusCode = HttpStatusCode.InternalServer,
    isOperational = true,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message, status, isOperational, code ?? "error.api.unexpected", meta);
  }
}
