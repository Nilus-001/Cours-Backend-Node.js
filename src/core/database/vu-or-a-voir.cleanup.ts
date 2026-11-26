import {db} from "../configs/database/typeorm.config";

export const deleteEmptyVuOrAVoir = async (idUser: number, idAnime: number): Promise<void> => {
    await db.query(
        'DELETE FROM vu_or_a_voir WHERE id_user = ? AND id_anime = ? AND is_watchlist = 0 AND currentwatch IS NULL AND date_visionnage IS NULL AND est_favoris = 0',
        [idUser, idAnime],
    );
}
