import { HttpStatusCode } from "../constants";
import { ClientError } from "./client-error";

export class BadRequestError extends ClientError {
  details;
  constructor(message: string, ip: string, details?: any[], meta?: any) {
    super(
      message,
      ip,
      HttpStatusCode.BadRequest,
      true,
      "error.api.notAcceptable",
      meta
    );
    details && (this.details = details);
  }
}
