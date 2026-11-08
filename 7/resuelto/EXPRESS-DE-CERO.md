# Express de cero

Para el Live Coding 3. Esto es lo que contás **antes** de abrir las capas: en la clase 07
Express aparece por primera vez, y recién en la clase 10 se ve en serio.

---

## 1. El problema que resuelve

Node solo ya puede atender pedidos HTTP, con el módulo `http`. El tema es cómo se ve:

```javascript
import http from "node:http";

const server = http.createServer((req, res) => {
    if (req.url === "/estudiantes" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ estudiantes: [] }));
    } else if (req.url === "/estudiantes" && req.method === "POST") {
        let body = "";
        req.on("data", trozo => body += trozo);     // el body llega por pedazos
        req.on("end", () => { /* ... */ });
    } else {
        res.writeHead(404);
        res.end("No existe");
    }
});
server.listen(3000);
```

Con cinco rutas eso es una cadena de `if` inmanejable, y el body hay que juntarlo a mano.
**Express es una capa arriba de ese mismo módulo `http`** que te da tres cosas:

- un **router**: decís "esta URL con este método la atiende esta función", sin `if`
- **middlewares**: pasos por los que atraviesa todo pedido antes de llegar a tu función
- **atajos** en `req` y `res`: `req.params`, `req.body`, `res.json()`, `res.status()`

No es un lenguaje nuevo ni un framework pesado. Es una librería.

```bash
npm install express
```

---

## 2. Las cuatro líneas que hay que entender

```javascript
import express from "express";      // 1. la librería

const app = express();              // 2. la aplicación

app.get("/hola", (req, res) => {    // 3. una ruta
    res.json({ mensaje: "hola" });
});

app.listen(3000);                   // 4. a escuchar
```

| línea | qué es |
|---|---|
| `express()` | crea **la app**: el objeto donde vas colgando rutas y middlewares |
| `app.get(...)` | **una ruta**: método HTTP + camino + la función que la atiende |
| `(req, res) => {}` | **el handler**: `req` es lo que te mandaron, `res` es lo que contestás |
| `app.listen(3000)` | abre el puerto. Hasta acá nada escuchaba |

Lo importante del orden: `app.get` **registra** la ruta, no la ejecuta. El handler corre
recién cuando llega un pedido que coincide.

---

## 3. `req` — lo que te mandaron

| de dónde | se lee con | ejemplo |
|---|---|---|
| el camino | `req.params` | `/estudiantes/7` → `req.params.id === "7"` |
| el `?` de la URL | `req.query` | `/buscar?apellido=lopez` → `req.query.apellido` |
| el cuerpo (POST/PUT) | `req.body` | el JSON que mandó el cliente |
| el método | `req.method` | `"GET"`, `"POST"` |

**Ojo con dos cosas:**

- `req.params.id` es **siempre un string**, aunque sea `/estudiantes/7`. Nunca un número.
- `req.body` es `undefined` **si no pusiste `app.use(express.json())`**. Es el error
  número uno de la clase siguiente, y conviene provocarlo hoy.

Para que una ruta tenga `:id`, se declara así:

```javascript
app.get("/estudiantes/:id", (req, res) => {
    res.json({ pediste: req.params.id });
});
```

---

## 4. `res` — lo que contestás

```javascript
res.json({ ok: true });                // manda JSON y cierra
res.status(404).json({ error: "..." }); // con código de estado
res.status(204).send();                 // sin cuerpo
```

| código | cuándo |
|---|---|
| `200` | salió bien |
| `201` | creaste algo (el POST) |
| `204` | salió bien y no hay nada que devolver (el DELETE) |
| `400` | el cliente mandó mal los datos |
| `404` | no existe lo que pidió |
| `409` | conflicto: el email ya está, hay hijos que lo referencian |
| `500` | se rompió algo del lado tuyo |

**La regla que ahorra media hora de debug:** por cada pedido se contesta **una sola vez**.
Si hacés dos `res.json()` en el mismo handler, el segundo tira
`Cannot set headers after they are sent`. De ahí el `return` antes de cada
`res.status(...)` en los controllers.

---

## 5. Middleware: todo lo que pasa antes

Un **middleware** es una función que recibe el pedido antes que tu ruta, hace algo, y
decide si lo deja seguir. Se registra con `app.use(...)`.

```javascript
app.use(express.json());          // lee el body JSON y lo pone en req.body
```

```javascript
// uno propio, para ver cada pedido en la consola
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();                       // <- sin esto, el pedido queda colgado
});
```

Dos cosas que hay que decir en voz alta:

- **El orden importa.** Express recorre lo que registraste **de arriba hacia abajo**. Si
  `app.use(express.json())` va después de las rutas, `req.body` llega vacío.
- **`next()` no es opcional.** Un middleware que no llama a `next()` ni contesta deja el
  pedido esperando para siempre. El navegador se queda girando.

Por eso el 404 va **al final** del archivo: es el `app.use` que atrapa todo lo que no
coincidió con ninguna ruta de arriba.

---

## 6. Router: las rutas en su propio archivo

`express.Router()` es una app en chiquito: junta rutas y después se cuelga de un camino.

```javascript
// routes/estudiantes.routes.js
export const estudiantesRouter = Router();
estudiantesRouter.get("/", listar);        // ojo: "/", no "/estudiantes"
```

```javascript
// el server
app.use("/estudiantes", estudiantesRouter);
```

El camino se **suma**: `"/estudiantes"` + `"/"` = `GET /estudiantes`, y
`"/estudiantes"` + `"/:id"` = `GET /estudiantes/7`. Dentro del router las rutas se
escriben **relativas**; si alguien escribe `"/estudiantes"` adentro del router, la URL
termina siendo `/estudiantes/estudiantes`.

---

## 7. Cómo se prueba sin frontend

Desde el navegador solo podés hacer `GET`. Para el resto:

```bash
curl http://localhost:3000/estudiantes/1
```

```bash
curl -X POST http://localhost:3000/estudiantes -H "Content-Type: application/json" -d "{\"nombre\":\"Ana\",\"apellido\":\"Perez\",\"email\":\"ana@escuela.edu\",\"fecha_nacimiento\":\"2004-01-01\"}"
```

Si no pasás el header `Content-Type: application/json`, `express.json()` no se activa y
`req.body` llega vacío. Vale mostrarlo a propósito.

---

## 8. Los tres errores que van a tener hoy

| lo que ven | la causa |
|---|---|
| `req.body` es `undefined` | falta `app.use(express.json())`, o va después de las rutas |
| `Cannot set headers after they are sent` | dos respuestas en el mismo handler (falta un `return`) |
| el pedido se queda girando | un middleware sin `next()` y sin respuesta |

Y uno más, que no es de Express: `EADDRINUSE`. El puerto 3000 ya está ocupado porque
quedó un `node` corriendo de la vez anterior. Se cambia el `PORT` en el `.env` o se cierra
el proceso viejo.

---

## 9. Lo que NO se ve hoy

Esto queda para la clase 10 en adelante, y conviene decirlo para que no pregunten:

- middlewares de error (`(err, req, res, next)`), clase 10
- `express-validator` para validar lo que llega, clase 14
- rate limiter, clase 12
- subida de archivos con `multer`, clase 13
- autenticación con JWT, clase 15

Hoy Express es solamente **el cartero**: recibe el pedido, lo lleva a la función correcta,
y devuelve lo que esa función contestó. Toda la lógica de datos sigue estando en el service.
