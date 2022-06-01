import express from 'express';
const router = express.Router();

import { CreateUserController, LoginUserController } from '../controllers/user.js';
import LogoutController from '../controllers/logout.js';



router.get('/logout', LogoutController);
router.post('/subscribe', CreateUserController);
router.post('/login', LoginUserController);

export default router;
