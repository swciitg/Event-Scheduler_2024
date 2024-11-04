import {getOnestopUser} from "../helpers/onestopUserHelper.js";
import { RequestValidationError } from "../errors/requestValidationError.js";

export const getUserInfo = async (req, res, next) => {
    try {

        const user = await getOnestopUser(req.headers.authorization, req.headers['security-key']);
        if (!user) {
            next(new RequestValidationError("Invalid User or Security Key / Spam Request")); 
        }else{
        // if (user.outlookEmail === guestUserEmail) {
        //     next(new GuestAccessError("Can't Access this feature in Guest Mode"));
        // } else {
            req.user = user;
            next();
        }
        // }
    } catch (e) {
        next(e);
    }
}

export const verifyUserInfo = async (req, res, next) => {
    try {
        const user = await getOnestopUser(req.headers.authorization, req.headers['security-key']);
        if (!user) {
            next(new RequestValidationError("Invalid User or Security Key / Spam Request")); 
        } else {
            req.user = user;
            next();
        }
    } catch (e) {
        next(e);
    }
}