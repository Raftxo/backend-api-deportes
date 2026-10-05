import express from 'express';
import { getEspacios, getEspacioById, createEspacio, updateEspacio, deleteEspacio } from '../controllers/espacios.controller.js';
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Definimos las rutas para /api/espacios
router.get('/', getEspacios);           // Obtener todos
router.get('/:id', getEspacioById);      // Obtener uno por ID
router.post('/',verificarToken, esAdmin, createEspacio);         // Crear= uno
router.put('/:id', verificarToken, esAdmin,updateEspacio);       // Actualizar uno
router.delete('/:id', verificarToken, esAdmin,deleteEspacio);    // Borrar uno

export default router;

