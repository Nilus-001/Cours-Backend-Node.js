import {Router} from 'express';
import * as authController from "../controllers/auth.controller";
import {ValidateDto} from '../middlewares/validate';
import {authenticate} from '../middlewares/auth';
import {userLoginDTO} from '../types/dtos/user.dtos';
import {refreshTokenDTO} from '../types/dtos/auth.dtos';

const router = Router();

router.post('/login', ValidateDto(userLoginDTO), authController.login);
router.post('/refresh', ValidateDto(refreshTokenDTO), authController.refresh);
router.post('/logout', ValidateDto(refreshTokenDTO), authController.logout);
router.post('/logout-all', authenticate, authController.logoutAll);
router.get('/me', authenticate, authController.me);

export default router;
