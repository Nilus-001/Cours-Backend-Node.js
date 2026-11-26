import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

type Source = "body" | "query" | "params";

export function ValidateDto<T extends object> (dto: ClassConstructor<T>, source: Source = "body"){
    return async (req: Request, res: Response, next: NextFunction) => {

        const object = plainToInstance(dto,req[source]);

        const errors = await validate(object, { whitelist : true , forbidNonWhitelisted : true });

        if (errors.length > 0) {
            throw errors;
        }

        if (source === "body") {
            req.body = object;
        }

        next()
    }
}

