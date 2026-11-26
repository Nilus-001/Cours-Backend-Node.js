import {registerUserListeners} from '../../context/user/app/handlers/user.listeners';
import {registerAuthListeners} from '../../context/auth/app/handlers/auth.listeners';

export const registerListeners = () => {
    registerUserListeners();
    registerAuthListeners();
}
