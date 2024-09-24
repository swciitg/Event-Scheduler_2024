import axios from 'axios';
import {onestopUserEndpoint} from '../shared/constants.js';
import {RequestValidationError} from "../errors/requestValidationError.js";
import {AccessTokenError} from "../errors/accessTokenError.js";
import {UserBlockedError} from "../errors/userBlockedError.js";
import {CustomError} from "../errors/customError.js";
import {NotAuthorizedError} from "../errors/notAuthorizedError.js";

export const getOnestopUser = async (authHeader, onestopSecurityKey) => {
    try {
        const res = await axios.get(onestopUserEndpoint, {
            headers: {
                "authorization": authHeader,
                "security-key": onestopSecurityKey,
            },
        });
        return res.data;
    } catch (e) {
        const res = e.response;

        if (res.status === 200) {
            return res.data;
        } else if (res.status === 400) {
            throw new RequestValidationError(res.data.message);
        } else if (res.status === 401) {
            throw new AccessTokenError(res.data.message);
        } else if (res.status === 403) {
            throw new NotAuthorizedError(res.data.message);
        } else if (res.status === 418) {
            throw new UserBlockedError(res.data.message);
        } else {
            throw new CustomError(res.data.message, res.status, 'Internal Server Error');
        }
    }
}