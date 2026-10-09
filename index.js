import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from "cors"
import espaciosRouter from './routes/espacios.routes.js'; 
import usuariosRouter from "./routes/usuarios.routes.js";
import reservasRouter from './routes/reservas.routes.js';
import authRouter from './routes/auth.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// 1. Inicializamos la aplicación de Express
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 2. Definimos el puerto donde correrá nuestro servidor
const PORT = 3000;

// 3. Middleware: Le decimos a Express que sepa entender los datos en formato JSON
app.use(express.json());
app.use(cors());

// RUTA DE LA DOCUMENTACIÓN (¡Debe ir antes que las rutas de la API!)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Landing page pública de la API
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/espacios', espaciosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/auth', authRouter);

// 5. Arrancamos el servidor para que escuche peticiones en el puerto indicado
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});