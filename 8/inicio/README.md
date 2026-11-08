# Clase 08 — Conceptos No Relacionales (para completar)

Base: **`escuela`** en MongoDB · se corre todo con `mongosh`.

## Antes de arrancar

MongoDB tiene que estar prendido. Para probarlo:

```bash
mongosh --eval "db.adminCommand({ping:1})"
```

## El orden

| Live Coding | Archivo | Qué completás |
|---|---|---|
| 1 | `live-coding-1-dos-modelos.js` | 4 tablas contra 2 colecciones, y el vocabulario |
| 2 | `live-coding-2-comparaciones.js` | las 6 comparaciones SQL contra Mongo |
| 3 | `live-coding-3-crud.js` | insertar, leer, actualizar, borrar y `replaceOne` |
| — | `ejercicio-tienda.js` | el ejercicio de clase |

`00-cargar-escuela.js` ya está hecho: es el dataset. No hay que tocarlo.

## Cómo correr

Siempre **parado en esta carpeta** (los archivos hacen `load("00-cargar-escuela.js")`):

```bash
mongosh live-coding-1-dos-modelos.js
```

## Las reglas

- El filtro es un **objeto**, no un string: `{ precio: { $gt: 100 } }`.
- Los operadores empiezan con `$`: `$gt`, `$lt`, `$in`, `$exists`, `$size`.
- `updateOne` + `$set` cambia solo lo que le pasás. `replaceOne` reemplaza todo.
- **Cuidá el filtro**: `deleteMany({})` borra la colección entera, y no hay `ROLLBACK`.
- Mongo **no tiene foreign keys** ni avisa de un typo. Eso llega en la clase 09.
