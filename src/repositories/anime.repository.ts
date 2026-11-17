import Anime from "../types/anime.type";
import AnimeFilter from "../types/animeFilter.type";
import {db} from "../configs/database/typeorm.config";
import {AnimeEntity} from "../entities/anime.entity";

let dataAnime: Anime[] = [
    {
        id: 1,
        name: "Fullmetal Alchemist: Brotherhood",
        date: new Date("2009-04-05"),
        url: "https://myanimelist.net/anime/5114",
        img: "https://example.com/img/fmab.jpg",
        rating: 9.1,
    },
    {
        id: 2,
        name: "Steins;Gate",
        date: new Date("2011-04-06"),
        url: "https://myanimelist.net/anime/9253",
        img: "https://example.com/img/steins-gate.jpg",
        rating: 9.0,
    },
    {
        id: 3,
        name: "Cowboy Bebop",
        date: new Date("1998-04-03"),
        url: "https://myanimelist.net/anime/1",
        img: "https://example.com/img/cowboy-bebop.jpg",
        rating: 8.8,
    },
];


export const getAnimes = (filters:AnimeFilter) => {

    // const animeFiltered = dataAnime.filter((anime) => {
    //     if (filters.name && !anime.name.toLowerCase().includes(filters.name.toLowerCase())) {
    //         return false;
    //     }
    //     if (filters.date && anime.date.toISOString().split('T')[0] !== filters.date) {
    //         return false;
    //     }
    //     if (filters.url && anime.url !== filters.url) {
    //         return false;
    //     }
    //     if (filters.rating && anime.rating !== filters.rating) {
    //         return false;
    //     }
    //     return true;
    // });


    return dataAnime.map((anime) => anime);
}

export const addAnime = (anime:Anime) => {

    const repo = db.getRepository(AnimeEntity);
    const newAnime = repo.create(anime);
    repo.save(newAnime).then(r => {
        return newAnime;
    });


}
