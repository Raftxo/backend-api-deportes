import 'dotenv/config';

export const PORT = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error('PORT debe ser un número entero entre 1 y 65535');
}

export const DB_NAME = process.env.DB_NAME || 'ayto_deportes.db';
export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Falta la variable JWT_SECRET en el entorno');
}
