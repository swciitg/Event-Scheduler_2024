import {getOnestopUser} from './onestopUserHelper.js';
import {guestUserEmail} from '../shared/constants.js';

export const verifyAuthentication = async (req) => {
    try {
        const user = await getOnestopUser(
            req.headers.authorization,
            req.headers['security-key'],
        );
        return user.outlookEmail !== guestUserEmail;

    } catch (e) {
        return false;
    }
}