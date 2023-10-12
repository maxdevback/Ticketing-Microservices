import { CustomError } from "..";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not founds");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
