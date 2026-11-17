import * as animeService from "../services/anime.service";
import Anime from "../types/anime.type";


export const getAnimes = ( req , res) => {
    const filter = req.query;
    const result = animeService.getAnimes(filter);

    res.status(200).send(result);
}

export const addAnime = (req , res) => {
    const data = req.body;
    const result : Anime = animeService.addAnime(data);

    res.status(200).send(result)
}

export const deleteAnime = (req , res) => {
    const data = req.body;
}
export const updateAnime = (req , res) => {
    const data = req.body;
}
export const getAnimeById = (req , res) => {

}