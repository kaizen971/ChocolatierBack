import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middlewares.js';
import { CreateUserController, LoginUserController ,UserController} from '../controllers/user.js';
import {InitStock, rewards} from '../controllers/stock.js'
import LogoutController from '../controllers/logout.js';



router.get('/logout', LogoutController);
router.get('/user',authMiddleware, UserController )
router.post('/subscribe', CreateUserController);
router.post('/login', LoginUserController);
router.post('/Reward',rewards)
router.get('/Stock',InitStock)



export default router;
