import {Router} from 'express';
import * as userController from "../controllers/user.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate, isSelfOrPermission} from '../../../auth/infra/guards/auth.guard';
import {UserIdParamDto, UserPermDto, UserToCreateDto, UserToUpdateDto} from '../dtos/user.dto';
import {requirePermission} from '../../../../core/http/perms/permission.middleware';
import {Perm} from '../../../../core/http/perms/perm.list';
import {UserFilterDto} from '../dtos/userFilter.dto';

const router = Router()

router.get('/', ValidateDto(UserFilterDto, "query"), userController.getUsers);

router.post('/add', ValidateDto(UserToCreateDto), userController.addUser);
router.get('/:id', ValidateDto(UserIdParamDto, "params"), userController.getUserById);
router.patch('/:id/update', authenticate, ValidateDto(UserIdParamDto, "params"), isSelfOrPermission(Perm.MANAGE_USERS), ValidateDto(UserToUpdateDto), userController.updateUser);
router.patch('/:id/perm', authenticate, requirePermission(Perm.ADMINISTRATOR), ValidateDto(UserIdParamDto, "params"), ValidateDto(UserPermDto), userController.updateUserPerm);
router.delete('/:id/delete', authenticate, ValidateDto(UserIdParamDto, "params"), isSelfOrPermission(Perm.MANAGE_USERS), userController.deleteUser);

export default router;
