import express from 'express';
// importamos controladores
import { getReservas, getReservaById, createReserva, updateReserva, deleteReserva, verificarReserva } from '../controllers/reservas.controller.js';
// importamos middlewares
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/',  getReservas);

// RUTA NUEVA: Verificar ticket (Solo Admins/Conserjes)
router.get('/verificar/:id', verificarToken, esAdmin, verificarReserva);

router.get('/:id',verificarToken, getReservaById);
router.post('/', verificarToken, createReserva);
router.put('/:id',verificarToken, updateReserva);
router.delete('/:id',verificarToken, deleteReserva);

export default router;

