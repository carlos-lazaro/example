import { HttpStatusCode } from "../api";
import { ResponseError } from "./interface";

export class BaseError extends Error implements ResponseError {
  code;
  meta?;
  status;
  isOperational;

  constructor(
    message: string,
    status: HttpStatusCode,
    isOperational: boolean,
    code?: string,
    meta?: Record<string, unknown>
  ) {
    super(message);

    this.status = status;
    this.isOperational = isOperational;
    this.code = code ?? "error.unexpected";
    this.meta = meta;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

  getErrorResponse(): [number, { [key: string]: any }] {
    const { status, ...response } = {
      ...this,
      message: this.message,
      name: this.name,
    };
    return [status, response];
  }
}
