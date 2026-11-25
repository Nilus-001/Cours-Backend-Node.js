import * as jwtService from "./jwt.service";
import {ITokenService} from "../../app/interfaces/token.service.interface";

export const typeJwtService: ITokenService = {
    signAccessToken: jwtService.signAccessToken,
    signRefreshToken: jwtService.signRefreshToken,
    verifyRefreshToken: jwtService.verifyRefreshToken,
    getExpirationDate: jwtService.getExpirationDate,
};
