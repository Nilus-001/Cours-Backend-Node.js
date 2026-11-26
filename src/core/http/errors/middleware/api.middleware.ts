import {Request, Response, NextFunction} from "express";
import {ValidationError} from "class-validator";
import {DomainError} from "../../errorDomain";
import {InvalidJsonError, RouteNotFoundError, UnknownError, ValidateError} from "../common.errors";

const isValidationErrors = (err: any): err is ValidationError[] =>
    Array.isArray(err) && err.length > 0 && err.every((e) => e instanceof ValidationError);

const formatValidationErrors = (errors: ValidationError[], parent = ""): Record<string, string[]> =>
    errors.reduce((acc, e) => {
        const path = parent ? `${parent}.${e.property}` : e.property;
        if (e.constraints) acc[path] = Object.values(e.constraints);
        return {...acc, ...formatValidationErrors(e.children ?? [], path)};
    }, {} as Record<string, string[]>);

const toDomainError = (err: any): DomainError => {
    if (err instanceof DomainError) return err;
    if (isValidationErrors(err)) return new ValidateError(formatValidationErrors(err));
    if (err?.type === 'entity.parse.failed') return new InvalidJsonError();
    console.error(err);
    return new UnknownError();
}

export const notFoundMiddleware = (req: Request) => {
    throw new RouteNotFoundError({method: req.method, url: req.originalUrl});
}

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    const error = toDomainError(err);
    res.status(error.code).json(error.toJson());
}
