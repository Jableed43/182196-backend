# El recorrido de un pedido por las 5 capas

Live Coding 3, paso 1. Esto es lo que proyectás mientras lo explicás.

## Las capas

| Capa | Archivo | Qué contiene | Qué NO contiene |
|---|---|---|---|
| Conexión | `config/db.js` | el `pool`, una sola vez | nada de consultas |
| Datos / servicio | `services/estudiantes.service.js` | todas las consultas de `estudiante` | nada de HTTP |
| Controller | `controllers/estudiantes.controller.js` | `req`, `res`, códigos de estado | **ni una línea de SQL** |
| Rutas | `routes/estudiantes.routes.js` | qué URL llama a qué función | nada de lógica |
| Arranque | `live-coding-3-capas.js` | `express()`, `app.listen` | nada de lo anterior |

## El recorrido completo de `GET /estudiantes/1`

```
  El navegador pide  GET /estudiantes/1
         |
         v
  live-coding-3-capas.js      app.use("/estudiantes", estudiantesRouter)
         |
         v
  routes/estudiantes.routes.js    .get("/:id", obtenerPorId)
         |
         v
  controllers/estudiantes.controller.js
         |   saca req.params.id  ->  "1"
         |   llama a getEstudianteById("1")
         v
  services/estudiantes.service.js
         |   "SELECT * FROM estudiante WHERE idestudiante = ?"  +  ["1"]
         v
  config/db.js       el pool presta una conexion libre
         |
         v
  MySQL              devuelve las filas
         |
         v   el service devuelve estudiantes[0], o null si no hay
  controller         si es null  -> res.status(404)
         |           si hay dato -> res.json(estudiante)
         v
  El navegador recibe el JSON
```

## Por qué separar

Si mañana la consulta cambia (agregás un `JOIN`, cambiás un nombre de columna),
la tocás en **un solo archivo**: el service. El controller, las rutas y el server
no se enteran.

Y al revés: si mañana la misma consulta la necesita otra ruta, o un script, o una
tarea programada, la función ya está escrita.

## La pregunta de control

> ¿Puede el controller tener un `SELECT`?

No. Si un controller tiene SQL, la capa ya se rompió. El mismo criterio para el
service: si un service tiene un `res.status(...)`, también.
