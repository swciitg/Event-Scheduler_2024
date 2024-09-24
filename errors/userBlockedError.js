import {CustomError} from "./customError.js";

export class UserBlockedError extends CustomError {
    constructor(message) {
        super(message, 418, "Blocked user request error");
    }
}