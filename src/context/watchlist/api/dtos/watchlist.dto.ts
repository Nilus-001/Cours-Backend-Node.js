import {ArrayUnique, IsArray, IsBoolean, IsIn, IsInt, IsOptional, Min} from "class-validator";
import {WATCHLIST_STATUTS, WatchlistStatut} from "../../domain/watchlist.statut";

export class WatchlistFilterDto {
    @IsOptional()
    @IsIn(WATCHLIST_STATUTS)
    statut?: WatchlistStatut;
}

export class ProgressDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    episode?: number | null;

    @IsOptional()
    @IsBoolean()
    termine?: boolean;
}

export class WatchlistOrderDto {
    @IsArray()
    @ArrayUnique()
    @IsInt({each: true})
    @Min(1, {each: true})
    idAnimes!: number[];
}
