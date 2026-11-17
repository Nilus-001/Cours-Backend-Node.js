import {IsDate, IsInt, Max, Min} from "class-validator";


const RATING_VALUE = { message: 'Rating must be between 0 and 10' };


class Anime {
    id: number;

    name: string;

    @IsDate()
    date: Date;

    url: string;

    img: string;

    @IsInt()
    @Min(0,RATING_VALUE)
    @Max(10,RATING_VALUE)
    rating: number;
}

export default Anime