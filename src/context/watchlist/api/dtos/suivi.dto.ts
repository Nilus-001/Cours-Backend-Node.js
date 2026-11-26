import {ArrayUnique, IsArray, IsBoolean, IsIn, IsInt, IsOptional, Min} from "class-validator";
import {Transform} from "class-transformer";
import {SUIVI_STATUTS, SuiviStatut} from "../../domain/suivi.statut";

const toBoolean = ({value}: {value: unknown}) => value === 'true' ? true : value === 'false' ? false : value;

export class SuiviFilterDto {
    @IsOptional()
    @IsIn(SUIVI_STATUTS)
    statut?: SuiviStatut;

    @IsOptional()
    @Transform(toBoolean)
    @IsBoolean()
    favori?: boolean;
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

export class SuiviOrdreDto {
    @IsArray()
    @ArrayUnique()
    @IsInt({each: true})
    @Min(1, {each: true})
    idAnimes!: number[];
}
