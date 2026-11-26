import {AccessTokenPayload} from "../../app/interfaces/auth.type";
import {ACCESS_TTL_SECONDS} from "./jwt.service";

const revokedJti = new Map<string, number>();
const invalidBefore = new Map<number, {since: number; until: number}>();

const now = () => Math.floor(Date.now() / 1000);

export const revokeToken = (jti: string, exp: number): void => {
    revokedJti.set(jti, exp);
}

export const revokeUserTokens = (userId: number): void => {
    const since = now();
    invalidBefore.set(userId, {since, until: since + ACCESS_TTL_SECONDS});
}

export const isTokenRevoked = (payload: AccessTokenPayload): boolean => {
    if (!payload.jti || revokedJti.has(payload.jti)) return true;
    const entry = invalidBefore.get(payload.sub);
    return entry !== undefined && payload.iat < entry.since;
}

const purge = () => {
    const t = now();
    for (const [jti, exp] of revokedJti) if (exp < t) revokedJti.delete(jti);
    for (const [userId, {until}] of invalidBefore) if (until < t) invalidBefore.delete(userId);
}

setInterval(purge, 60_000).unref();
