import {ArrayUnique, IsArray, IsInt, Min} from "class-validator";

export class FavoriteOrderDto {
    @IsArray()
    @ArrayUnique()
    @IsInt({each: true})
    @Min(1, {each: true})
    idAnimes!: number[];
}
