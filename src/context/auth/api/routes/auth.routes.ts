import {Router} from 'express';
import * as authController from "../controllers/auth.controller";
import {ValidateDto} from '../../../../core/http/validations/validate';
import {authenticate} from '../../infra/guards/auth.guard';
import {loginLimiter} from '../../infra/guards/login.limiter';
import {RefreshTokenDto, UserLoginDto} from '../dtos/auth.dto';

const router = Router();

router.post('/login', loginLimiter, ValidateDto(UserLoginDto), authController.login);
router.post('/refresh', ValidateDto(RefreshTokenDto), authController.refresh);
router.post('/logout', authenticate, ValidateDto(RefreshTokenDto), authController.logout);
router.post('/logout-all', authenticate, authController.logoutAll);
router.get('/me', authenticate, authController.me);

export default router;
