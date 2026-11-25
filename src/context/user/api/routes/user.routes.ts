import {Router} from 'express';
import * as userController from "../controllers/user.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate, isSelf} from '../../../auth/infra/guards/auth.guard';
import {userIdParamDTO, userToCreateDTO, userToUpdateDTO} from '../dtos/user.dto';
import {userFilterDTO} from '../dtos/userFilter.dto';

const router = Router()

router.get('/', ValidateDto(userFilterDTO, "query"), userController.getUsers);

router.post('/add', ValidateDto(userToCreateDTO), userController.addUser);
router.get('/:id', ValidateDto(userIdParamDTO, "params"), userController.getUserById);
router.patch('/:id/update', authenticate, ValidateDto(userIdParamDTO, "params"), isSelf, ValidateDto(userToUpdateDTO), userController.updateUser);
router.delete('/:id/delete', authenticate, ValidateDto(userIdParamDTO, "params"), isSelf, userController.deleteUser);

export default router;
