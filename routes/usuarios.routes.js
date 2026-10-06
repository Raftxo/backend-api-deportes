import express from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.controller.js';
import {verificarToken, esAdmin} from '../middlewares/auth.middleware.js';

// falta actualizar según el manual: https://docs.google.com/document/d/1hADGNTRqQ2Ub8HQwCG_F4yrx1etM6rCMEhBN0F3UEgc/edit?tab=t.0#heading=h.1waulj19bctz

const router = express.Router();

router.get('/', verificarToken, esAdmin, getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;

