import { CustomError } from "..";
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
