import {Router} from 'express';
import * as userController from "../controllers/user.controller";
import {ValidateDto} from '../middlewares/validate';
import {authenticate, isSelf} from '../middlewares/auth';
import {userFilterDTO, userIdParamDTO, userToCreateDTO, userToUpdateDTO} from '../types/dtos/user.dtos';

const router = Router()

router.get('/', ValidateDto(userFilterDTO, "query"), userController.getUsers);

router.post('/add', ValidateDto(userToCreateDTO), userController.addUser);
router.get('/:id', ValidateDto(userIdParamDTO, "params"), userController.getUserById);
router.patch('/:id/update', authenticate, ValidateDto(userIdParamDTO, "params"), isSelf, ValidateDto(userToUpdateDTO), userController.updateUser);
router.delete('/:id/delete', authenticate, ValidateDto(userIdParamDTO, "params"), isSelf, userController.deleteUser);

export default router;
