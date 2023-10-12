import { CustomError } from "..";
export declare class NotFoundError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
