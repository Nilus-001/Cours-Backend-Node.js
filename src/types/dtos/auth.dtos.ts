import {IsJWT, IsNotEmpty, IsString} from "class-validator";

export class refreshTokenDTO {
    @IsString()
    @IsNotEmpty({message: "Le refresh token est obligatoire"})
    @IsJWT({message: "Le refresh token est invalide"})
    refreshToken!: string;
}
