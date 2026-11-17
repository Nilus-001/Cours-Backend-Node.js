import { IsString, IsNotEmpty, IsUrl, IsNumber, IsInt, Min, Max, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class animeToCreateDto {
    @IsString()
    @IsNotEmpty({ message: "Le nom est obligatoire" })
    name!: string;

    @IsOptional()
    @IsDateString()
    date?: string | null;

    @IsUrl()
    url!: string;

    @IsUrl()
    img!: string;

    @IsNumber()
    @Min(0)
    @Max(10)
    rating!: number;
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

export class animeFilterDto {
    @IsOptional()
    @IsString()
    nom?: string;

    @IsOptional()
    @IsDateString()
    dateAnnonce?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    idCategorie?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    idGenre?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    idTheme?: number;
}
