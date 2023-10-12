"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const __1 = require("..");
class NotAuthorizedError extends __1.CustomError {
    constructor() {
        super("Not Authorized");
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not authorized" }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
