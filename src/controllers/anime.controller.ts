import {Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import * as animeService from "../services/anime.service";
import {animeFilterDto} from "../types/dtos/anime.dto";

export const getAnimes = async (req: Request, res: Response) => {
    const filters = plainToInstance(animeFilterDto, req.query);
    res.status(200).send(await animeService.getAnimes(filters));
}

export const addAnime = async (req: Request, res: Response) => {
    res.status(201).send(await animeService.addAnime(req.body));
}

export const deleteAnime = (req , res) => {
    const data = req.body;
}
export const updateAnime = (req , res) => {
    const data = req.body;
}
export const getAnimeById = (req , res) => {

}
