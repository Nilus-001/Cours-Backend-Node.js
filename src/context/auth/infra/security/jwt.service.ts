import jwt, {SignOptions} from "jsonwebtoken";
import {randomUUID} from "crypto";
import {AccessTokenPayload, RefreshTokenPayload} from "../../app/interfaces/auth.type";
import getEnv from "../../../../core/utils/getEnv.utils";


const ACCESS_SECRET = getEnv('JWT_ACCESS_SECRET');
const REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
const ACCESS_EXPIRES_IN = (process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') as SignOptions['expiresIn'];
const REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

export const signAccessToken = (userId: number, identifiant: string, perm: bigint): string => {
    return jwt.sign({identifiant, perm: perm.toString()}, ACCESS_SECRET, {
        subject: String(userId),
        expiresIn: ACCESS_EXPIRES_IN,
        algorithm: 'HS256',
    });
}

export const signRefreshToken = (userId: number): string => {
    return jwt.sign({}, REFRESH_SECRET, {
        subject: String(userId),
        jwtid: randomUUID(),
        expiresIn: REFRESH_EXPIRES_IN,
        algorithm: 'HS256',
    });
}

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    const decoded = jwt.verify(token, ACCESS_SECRET, {algorithms: ['HS256']}) as jwt.JwtPayload;
    return {sub: Number(decoded.sub), identifiant: decoded.identifiant, perm: BigInt(decoded.perm ?? 0)};
}

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    const decoded = jwt.verify(token, REFRESH_SECRET, {algorithms: ['HS256']}) as jwt.JwtPayload;
    return {sub: Number(decoded.sub), jti: decoded.jti};
}

export const getExpirationDate = (token: string): Date => {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    return new Date(decoded.exp * 1000);
}
