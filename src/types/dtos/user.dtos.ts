import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min, MinLength} from "class-validator";
import {Transform, Type} from "class-transformer";

const IDENTIFIANT_FORMAT = {message: "L'identifiant ne peut contenir que des lettres, chiffres, '.', '_' et '-'"};
const EMAIL_FORMAT = {message: "L'email n'est pas valide"};
const normalizeEmail = ({value}: {value: unknown}) => typeof value === 'string' ? value.trim().toLowerCase() : value;

export class userToCreateDTO {
    @IsString()
    @IsNotEmpty({message: "L'identifiant est obligatoire"})
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9._-]+$/, IDENTIFIANT_FORMAT)
    identifiant!: string;

    @IsOptional()
    @Transform(normalizeEmail)
    @IsEmail({}, EMAIL_FORMAT)
    @MaxLength(255)
    email?: string | null;

    @IsString()
    @MinLength(8, {message: "Le mot de passe doit contenir au moins 8 caractères"})
    @MaxLength(72)
    motDePasse!: string;
}

export class userToUpdateDTO {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9._-]+$/, IDENTIFIANT_FORMAT)
    identifiant?: string;

    @IsOptional()
    @Transform(normalizeEmail)
    @IsEmail({}, EMAIL_FORMAT)
    @MaxLength(255)
    email?: string | null;

    @IsOptional()
    @IsString()
    @MinLength(8, {message: "Le mot de passe doit contenir au moins 8 caractères"})
    @MaxLength(72)
    motDePasse?: string;
}

export class userLoginDTO {
    @IsString()
    @IsNotEmpty({message: "L'identifiant est obligatoire"})
    identifiant!: string;

    @IsString()
    @IsNotEmpty({message: "Le mot de passe est obligatoire"})
    motDePasse!: string;
}

export class userIdParamDTO {
    @Type(() => Number)
    @IsInt({message: "L'id doit être un entier"})
    @Min(1)
    id!: number;
}

export class userFilterDTO {
    @IsOptional()
    @IsString()
    identifiant?: string;
}
