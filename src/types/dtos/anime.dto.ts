import { IsString, IsNotEmpty, IsUrl, IsNumber, Min, Max, IsOptional, IsDateString } from "class-validator";

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
