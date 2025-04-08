import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.post("/register", AuthController.handleRegister);
router.post("/login", AuthController.handleLogin);

export default router;