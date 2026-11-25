import {IsOptional, IsString} from "class-validator";

export class userFilterDTO {
    @IsOptional()
    @IsString()
    identifiant?: string;
}
