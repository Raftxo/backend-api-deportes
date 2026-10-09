# API de Espacios Deportivos

API REST para consultar y gestionar espacios deportivos municipales, reservas y usuarios. Incluye una página de bienvenida y documentación interactiva.

## Ejecución local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto:

   ```env
   PORT=3000
   DB_NAME=ayto_deportes.db
   JWT_SECRET=pon-aqui-un-secreto-largo-y-unico
   ```

3. Arranca el servidor:

   ```bash
   npm run dev
   ```

- Página de bienvenida: `http://localhost:3000/`
- Documentación Swagger: `http://localhost:3000/api-docs`
- Espacios: `http://localhost:3000/api/espacios`

No publiques el archivo `.env` ni reutilices en producción el secreto de ejemplo. El archivo está excluido de Git.

## Despliegue de la API en Render

Configura el servicio web para instalar las dependencias (`npm install`) e iniciar con `npm start`. En **Environment**, configura `JWT_SECRET` con un valor aleatorio, largo y privado. Render asigna `PORT` automáticamente; no lo fijes manualmente. Si no defines `DB_NAME`, la aplicación crea `ayto_deportes.db` en su directorio de trabajo.

La base de datos es SQLite. En el plan gratuito de Render, el almacenamiento local del servicio es efímero: los datos pueden perderse al reiniciar o desplegar. Para conservarlos hace falta un almacenamiento persistente compatible con tu plan, o migrar a una base de datos gestionada como PostgreSQL.

### Problemas encontrados en Render

- **`Cannot open database because the directory does not exist`:** `better-sqlite3` no crea los directorios padre de la ruta configurada en `DB_NAME`. La aplicación ahora los crea antes de abrir SQLite.
- **`EACCES: permission denied, mkdir '/var/data'`:** el servicio estaba configurado con `DB_NAME=/var/data/ayto_deportes.db`, pero no tenía un disco montado en `/var/data`. Los discos persistentes no están disponibles en el plan gratuito. Para ese plan, elimina `DB_NAME` de las variables de Render (o usa `DB_NAME=ayto_deportes.db`). La ruta `/var/data/...` solo es apropiada si tienes un disco montado allí y tu plan lo permite.
- **Puerto del servicio:** Render define `PORT` al ejecutar el servicio. La aplicación debe usar esa variable en vez de asumir un puerto fijo.

## Despliegue del frontend en Netlify

El frontend debe llamar al endpoint completo de espacios de la API desplegada:

```text
https://backend-api-deportes.onrender.com/api/espacios
```

Configura `API_URL` en el proyecto de Netlify con el origen de la API:

```text
https://backend-api-deportes.onrender.com
```

Y construye la ruta del recurso incluyendo `/api`:

```js
fetch(`${API_URL}/api/espacios`);
```

Comprueba el nombre/formato de variable que espera el framework del frontend. En aplicaciones compiladas para el navegador, las variables suelen incorporarse al generar los archivos estáticos: después de cambiar `API_URL`, inicia un nuevo deploy/build en **Netlify → Deploys → Trigger deploy → Deploy site**. Luego comprueba en las herramientas de desarrollo del navegador, pestaña **Network**, que la petición se dirija exactamente a `/api/espacios` en el dominio de Render.

### Problemas encontrados en Netlify

- **Error al conectar con el Ayuntamiento:** la API estaba activa, pero el JavaScript publicado solicitaba `/espacios` en vez de `/api/espacios`. Actualiza la base URL o añade `/api` a la ruta, según cómo esté organizado el código del frontend.
- **Cambios en `API_URL` que no aparecen en el sitio:** vuelve a construir y desplegar el frontend para que la nueva variable quede incorporada a los archivos publicados.
- **Mensaje de seguridad sobre `file:///`:** una página servida desde HTTPS no puede hacer solicitudes a archivos locales `file://`. Abre el sitio mediante su URL `https://...` y comprueba en **Network** la URL exacta que falla; las llamadas a la API deben usar HTTPS.

## Rutas principales

- `GET /api/espacios`: listar espacios.
- `/api/reservas`: consultar y gestionar reservas; algunas operaciones requieren autenticación.
- `/api/usuarios`: operaciones de usuarios.
- `POST /api/auth/login`: iniciar sesión y obtener un token.
- `GET /api-docs`: explorar la especificación y probar los endpoints documentados.
