// const { CustomError } = require("./customError");
import { CustomError } from "./customError.js";


export const NotAuthorizedError = class NotAuthorizedError extends CustomError{
    constructor(message){
        super(message, 403, 'Forbidden');
    }
}