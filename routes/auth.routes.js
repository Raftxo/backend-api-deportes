import express from 'express';
import { login } from '../controllers/auth.controller.js';

// hay que actualizar con la versión de profe con rate limit express-rate-limit etc...

const router = express.Router();

// Solo necesitamos POST para login
router.post('/login', login);

export default router;