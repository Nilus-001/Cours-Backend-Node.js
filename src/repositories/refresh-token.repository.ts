import {LessThan} from "typeorm";
import {db} from "../configs/database/typeorm.config";
import {RefreshTokenEntity} from "../entities/refresh-token.entity";

const refreshTokenRepository = () => db.getRepository(RefreshTokenEntity);

export const saveRefreshToken = async (userId: number, tokenHash: string, dateExpiration: Date): Promise<void> => {
    await refreshTokenRepository().insert({
        tokenHash,
        dateExpiration,
        user: {id: userId},
    });
}

export const getRefreshTokenByHash = async (tokenHash: string): Promise<RefreshTokenEntity | null> => {
    return refreshTokenRepository().findOne({where: {tokenHash}, relations: {user: true}});
}

export const deleteRefreshTokenByHash = async (tokenHash: string): Promise<boolean> => {
    const result = await refreshTokenRepository().delete({tokenHash});
    return (result.affected ?? 0) > 0;
}

export const deleteAllRefreshTokensOfUser = async (userId: number): Promise<void> => {
    await refreshTokenRepository().delete({user: {id: userId}});
}

export const deleteExpiredRefreshTokens = async (): Promise<void> => {
    await refreshTokenRepository().delete({dateExpiration: LessThan(new Date())});
}
