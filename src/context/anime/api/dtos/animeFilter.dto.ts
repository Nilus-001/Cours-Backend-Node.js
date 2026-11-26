import { IsString, IsInt, Min, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class AnimeFilterDto {
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
