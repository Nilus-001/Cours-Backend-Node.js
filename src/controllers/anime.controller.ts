import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import * as animeService from "../services/anime.service";
import {animeFilterDto} from "../types/dtos/anime.dto";

export const getAnimes = async (req: Request, res: Response) => {
    try {
        const filters = plainToInstance(animeFilterDto, req.query);
        const result = await animeService.getAnimes(filters);
        res.status(200).send(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Erreur lors de la récupération des animes"});
    }
}

export const addAnime = async (req: Request, res: Response) => {
    try {
        const result = await animeService.addAnime(req.body);
        res.status(201).send(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Erreur lors de l'ajout de l'anime"});
    }
}

export const deleteAnime = (req , res) => {
    const data = req.body;
}
export const updateAnime = (req , res) => {
    const data = req.body;
}
export const getAnimeById = (req , res) => {

}