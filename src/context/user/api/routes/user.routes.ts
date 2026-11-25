import {Router} from 'express';
import * as userController from "../controllers/user.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate, isSelfOrPermission} from '../../../auth/infra/guards/auth.guard';
import {userIdParamDTO, userPermDTO, userToCreateDTO, userToUpdateDTO} from '../dtos/user.dto';
import {requirePermission} from '../../../../core/http/perms/permission.middleware';
import {Perm} from '../../../../core/http/perms/perm.list';
import {userFilterDTO} from '../dtos/userFilter.dto';

const router = Router()

router.get('/', ValidateDto(userFilterDTO, "query"), userController.getUsers);

router.post('/add', ValidateDto(userToCreateDTO), userController.addUser);
router.get('/:id', ValidateDto(userIdParamDTO, "params"), userController.getUserById);
router.patch('/:id/update', authenticate, ValidateDto(userIdParamDTO, "params"), isSelfOrPermission(Perm.MANAGE_USERS), ValidateDto(userToUpdateDTO), userController.updateUser);
router.patch('/:id/perm', authenticate, requirePermission(Perm.ADMINISTRATOR), ValidateDto(userIdParamDTO, "params"), ValidateDto(userPermDTO), userController.updateUserPerm);
router.delete('/:id/delete', authenticate, ValidateDto(userIdParamDTO, "params"), isSelfOrPermission(Perm.MANAGE_USERS), userController.deleteUser);

export default router;
