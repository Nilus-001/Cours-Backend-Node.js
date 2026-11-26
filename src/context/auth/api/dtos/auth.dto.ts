import {IsJWT, IsNotEmpty, IsString} from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty({message: "Le refresh token est obligatoire"})
    @IsJWT({message: "Le refresh token est invalide"})
    refreshToken!: string;
}

export class UserLoginDto {
    @IsString()
    @IsNotEmpty({message: "L'identifiant est obligatoire"})
    identifiant!: string;

    @IsString()
    @IsNotEmpty({message: "Le mot de passe est obligatoire"})
    motDePasse!: string;
}
