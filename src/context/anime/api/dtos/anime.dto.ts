import { IsString, IsNotEmpty, IsUrl, IsNumber, IsInt, Min, Max, IsOptional, IsDateString, IsArray, ArrayUnique } from "class-validator";
import { Type } from "class-transformer";

export class animeToCreateDto {
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

export class animeToUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Le nom ne peut pas être vide" })
    name?: string;

    @IsOptional()
    @IsDateString()
    date?: string | null;

    @IsOptional()
    @IsUrl()
    url?: string;

    @IsOptional()
    @IsUrl()
    img?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;
}

export class animeIdParamDto {
    @Type(() => Number)
    @IsInt({ message: "L'id doit être un entier" })
    @Min(1)
    id!: number;
}
