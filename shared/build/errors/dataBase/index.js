"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const __1 = require("../");
class DatabaseConnectionError extends __1.CustomError {
    constructor() {
        super("Error connecting to db");
        this.statusCode = 500;
        this.reason = "Error connecting to database";
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
