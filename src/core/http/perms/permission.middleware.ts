import {NextFunction, Request, Response} from "express";
import {hasPerm} from "./utils/permission.util";
import {PermissionDeniedError} from "../errors/common.errors";
import {Perm} from "./perm.list";

export const requirePermission = (permission : bigint) => (req : Request, res : Response, next : NextFunction) => {
    const perms = BigInt(req.user?.perm ?? 0n)
    if(!hasPerm(perms, Perm.ADMINISTRATOR) && !hasPerm(perms, permission)) {
        throw new PermissionDeniedError({required: permission.toString()});
    }

    next()
}
