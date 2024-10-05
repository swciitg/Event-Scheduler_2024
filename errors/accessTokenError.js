import {CustomError} from "./customError.js";

export class AccessTokenError extends CustomError {
    constructor(message) {
        super(message, 401, "Access token error");
    }
}