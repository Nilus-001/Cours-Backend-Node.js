import { IsString, IsNotEmpty, IsUrl, IsInt, Min, IsOptional, IsDateString, IsArray, ArrayUnique } from "class-validator";
import { Type } from "class-transformer";

export class AnimeToCreateDto {
    @IsString()
    @IsNotEmpty({ message: "Le nom est obligatoire" })
    nom!: string;

    @IsOptional()
    @IsString()
    synopsis?: string | null;

    @IsOptional()
    @IsUrl()
    image?: string | null;

    @IsOptional()
    @IsDateString()
    dateAnnonce?: string | null;

    @IsOptional()
    @IsInt()
    @Min(1)
    idCategorie?: number | null;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idGenres?: number[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idThemes?: number[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idProducteurs?: number[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idSources?: number[];
}

export class AnimeToUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Le nom ne peut pas être vide" })
    nom?: string;

    @IsOptional()
    @IsString()
    synopsis?: string | null;

    @IsOptional()
    @IsUrl()
    image?: string | null;

    @IsOptional()
    @IsDateString()
    dateAnnonce?: string | null;

    @IsOptional()
    @IsInt()
    @Min(1)
    idCategorie?: number | null;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idGenres?: number[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idThemes?: number[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idProducteurs?: number[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    idSources?: number[];
}

export class AnimeIdParamDto {
    @Type(() => Number)
    @IsInt({ message: "L'id doit être un entier" })
    @Min(1)
    id!: number;
}
