import {AccessTokenPayload} from "../../app/interfaces/auth.type";

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload;
        }
    }
}

export {};
