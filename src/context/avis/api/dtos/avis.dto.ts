import {IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, ValidateIf} from "class-validator";
import {NOTE_MAX, NOTE_MIN} from "../../domain/avis.note";

export const COMMENTAIRE_MAX = 2000;

export class AvisToCreateDto {
    @IsInt({message: "La note doit être un entier"})
    @Min(NOTE_MIN)
    @Max(NOTE_MAX)
    note!: number;

    @IsOptional()
    @IsString()
    @MaxLength(COMMENTAIRE_MAX)
    commentaire?: string | null;

    @IsOptional()
    @IsInt()
    @Min(1)
    idCategorie?: number | null;
}

export class ReponseToCreateDto {
    @IsString()
    @IsNotEmpty({message: "Le commentaire est obligatoire"})
    @MaxLength(COMMENTAIRE_MAX)
    commentaire!: string;
}

export class AvisToUpdateDto {
    @ValidateIf((o) => o.note !== undefined)
    @IsInt({message: "La note doit être un entier"})
    @Min(NOTE_MIN)
    @Max(NOTE_MAX)
    note?: number;

    @IsOptional()
    @IsString()
    @MaxLength(COMMENTAIRE_MAX)
    commentaire?: string | null;

    @IsOptional()
    @IsInt()
    @Min(1)
    idCategorie?: number | null;
}
