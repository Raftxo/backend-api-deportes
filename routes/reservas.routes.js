import express from 'express';
// importamos controladores
import { getReservas, getReservaById, createReserva, updateReserva, deleteReserva, verificarReserva } from '../controllers/reservas.controller.js';
// importamos middlewares
import { verificarToken, esAdmin, tieneRol } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/',  getReservas);

// RUTA NUEVA: Verificar ticket (Solo Admins/Conserjes)
router.get('/verificar/:id', verificarToken, esAdmin, verificarReserva);

router.get('/:id',verificarToken, getReservaById);

/**
* @swagger
* /api/reservas:
*   post:
*     summary: Crear una nueva reserva de un espacio deportivo
*     description: El ID del usuario se obtiene automáticamente del Token JWT. No es necesario enviarlo en el body.
*     tags: [Reservas]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - espacio_id
*               - fecha
*               - hora_inicio
*               - hora_fin
*             properties:
*               espacio_id:
*                 type: integer
*                 description: ID del espacio a reservar
*                 example: 1
*               fecha:
*                 type: string
*                 format: date
*                 description: Fecha de la reserva (YYYY-MM-DD)
*                 example: "2024-10-15"
*               hora_inicio:
*                 type: string
*                 description: Hora de inicio (HH:MM)
*                 example: "10:00"
*               hora_fin:
*                 type: string
*                 description: Hora de fin (HH:MM)
*                 example: "11:00"
*     responses:
*       201:
*         description: Reserva creada exitosamente
*       400:
*         description: Faltan datos o el espacio está cerrado por mantenimiento
*       404:
*         description: El espacio no existe
*       409:
*         description: Conflicto - El espacio ya está reservado en esa fecha y hora
*/
router.post('/', verificarToken, tieneRol('ciudadano', 'conserje', 'admin'), createReserva);
router.put('/:id',verificarToken, updateReserva);
router.delete('/:id',verificarToken, deleteReserva);

export default router;
