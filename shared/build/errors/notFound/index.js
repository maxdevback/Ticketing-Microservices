"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const __1 = require("..");
class NotFoundError extends __1.CustomError {
    constructor() {
        super("Route not founds");
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not Found" }];
    }
}
exports.NotFoundError = NotFoundError;
