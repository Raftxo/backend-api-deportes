import express from 'express';
import { getEspacios, getEspacioById, createEspacio, updateEspacio, deleteEspacio } from '../controllers/espacios.controller.js';
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Definimos las rutas para /api/espacios
// la primera ruta le añadimos descripción para swagger
/**
* @swagger
* /api/espacios:
*   get:
*     summary: Obtener todos los espacios deportivos
*     tags: [Espacios]
*     responses:
*       200:
*         description: Lista de espacios deportivos
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                   nombre:
*                     type: string
*                   tipo:
*                     type: string
*/
router.get('/', getEspacios);           // Obtener todos

// las demas rutas
router.get('/:id', getEspacioById);      // Obtener uno por ID

/**
* @swagger
* /api/espacios:
*   post:
*     summary: Crear un nuevo espacio deportivo (Solo Administradores)
*     tags: [Espacios]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - nombre
*               - tipo
*               - ubicacion
*               - capacidad_maxima
*             properties:
*               nombre:
*                 type: string
*                 example: "Pista de Tenis"
*               tipo:
*                 type: string
*                 example: "Tenis"
*               ubicacion:
*                 type: string
*                 example: "Polideportivo Sur"
*               capacidad_maxima:
*                 type: integer
*                 example: 4
*               disponible:
*                 type: integer
*                 description: 1 para disponible, 0 para cerrado. Por defecto es 1.
*                 example: 1
*     responses:
*       201:
*         description: Espacio creado exitosamente
*       400:
*         description: Faltan campos obligatorios
*       403:
*         description: Acceso prohibido (No eres administrador)
*/
router.post('/',verificarToken, esAdmin, createEspacio);         // Crear= uno
router.put('/:id', verificarToken, esAdmin,updateEspacio);       // Actualizar uno
router.delete('/:id', verificarToken, esAdmin,deleteEspacio);    // Borrar uno

export default router;

