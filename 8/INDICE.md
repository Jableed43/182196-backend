# Clase 08 — Conceptos No Relacionales (MongoDB)

Base: **`escuela`** en MongoDB (los mismos datos que la `escuela` de MySQL).
Todo se corre con `mongosh`, y todo se puede repetir: lo que escribe, lo borra.

```bash
mongosh --eval "db.adminCommand({ping:1})"
```

---

## Archivos

Mismos nombres arriba y en `inicio\`. Un archivo por Live Coding del deck.

| archivo | Live Coding de la slide | apunte |
|---|---|---|
| `00-cargar-escuela.js` | — el dataset, lo llama el LC 1 y el LC 3 | — |
| `live-coding-1-dos-modelos.js` | **LC 1** · Los mismos datos en dos modelos | 1.2 / 1.3 |
| `live-coding-2-comparaciones.js` | **LC 2** · Las comparaciones entre SQL y Mongo | 2.1–2.3 |
| `live-coding-3-crud.js` | **LC 3** · CRUD de MongoDB en vivo | 3.1 / 3.2 |
| `ejercicio-tienda.js` | 📝 Ejercicio de clase, los 7 puntos | — |

- **Raíz** = resuelto, lo que proyectás.
- **`inicio\`** = los mismos con `// TODO:`, lo que abren ellos.

---

## Cómo correr

**Siempre parado en esta carpeta**: los archivos hacen `load("00-cargar-escuela.js")`,
que se resuelve contra el directorio donde estás.

```bash
mongosh live-coding-1-dos-modelos.js
```

```bash
mongosh live-coding-2-comparaciones.js
```

```bash
mongosh live-coding-3-crud.js
```

```bash
mongosh ejercicio-tienda.js
```

---

## Lo que demuestra cada archivo

**LC 1** — carga el dataset y muestra el modelo: en MySQL eran **4 tablas**
(`docente`, `materia`, `estudiante`, `inscripcion`); acá son **2 colecciones**.
`docente` va embebido dentro de cada materia, `inscripcion` dentro de cada estudiante,
y la tabla intermedia N:M **no existe**. Cierra con el vocabulario y con un
`insertOne` sin `_id` para que se vea el `ObjectId` que genera Mongo
(y que trae la fecha de creación adentro: `_id.getTimestamp()`).

**LC 2** — las seis comparaciones, con el resultado real de cada una:

| # | la pregunta | quién gana |
|---|---|---|
| 1 | dame todo lo de un estudiante | **Mongo** — un `findOne` contra un JOIN de 3 tablas |
| 2 | quiénes no cursan nada | empate — `{ $size: 0 }` contra `LEFT JOIN ... IS NULL` |
| 3 | cuántos inscriptos por materia | **SQL** — un `GROUP BY` contra un `$unwind` + `$group` |
| 4 | cambió el nombre de una materia | **SQL, y por mucho** |
| 5 | inscribir en una materia que no existe | **SQL** — Mongo no tiene FK |
| 6 | campos distintos, y el typo | empate — es el doble filo |

La 4 es la que hay que mostrar despacio: en SQL es **1 fila**; en Mongo hay que tocar
**11 documentos más** porque el nombre está duplicado adentro de cada estudiante.
Es literalmente la anomalía de actualización de la clase 06, del lado de enfrente.
El archivo lo hace de verdad y después lo deshace.

**LC 3** — el CRUD completo: la colección que se crea sola en el primer `insert`,
`insertOne` / `insertMany`, el filtro como **objeto** (`{ precio: { $gt: 100 } }`),
la proyección, `updateOne` + `$set`, `updateMany`, `deleteOne`, el `deleteMany({})`
demostrado **sobre una copia** para no perder nada, y el paso 4 de la slide:
`replaceOne` borra los campos que no le mandás, en silencio.

**Ejercicio** — `tienda.productos`: los 4 documentos con campos distintos, las tres
consultas, el `$set`, el `deleteOne`, y el `{ precoi: 200 }` con el typo, que después
no aparece buscando por `precio` y sí aparece con `{ precio: { $exists: false } }`.

---

## Ojo con esto al dar la clase

**1. `use escuela` sin paréntesis no funciona dentro de un archivo.**
En la consola de `mongosh` escribís `use escuela`. En un `.js` hay que escribir
`use("escuela")`, con paréntesis y comillas. Es el primer paredón si alguien copia
lo de la consola a un archivo.

**2. Hay que estar parado en la carpeta.**
`load("00-cargar-escuela.js")` busca el archivo en el directorio actual. Si lo corrés
desde otro lado: `Error: ENOENT`. Es el error más probable de la clase.

**3. Cambié el dataset del LC 3 a propósito.**
El TIP de esa slide manda a `mongodb/2/scripts/00-reset.js`, que usa la base
**`veterinaria`**. Acá el LC 3 usa `escuela`, igual que el LC 1 y el LC 2, para que
la clase entera trabaje sobre **un solo dataset** y no haya que explicar dos modelos
nuevos. El archivo de `veterinaria` sigue existiendo en el repo de apuntes si lo
preferís.

**4. En `tienda` ya hay una colección `producto` (singular), de otra clase.**
Tiene 17 documentos y el ejercicio **no la toca**: usa `productos`, en plural, que es
como lo escribe el enunciado. Si abrís Compass en vivo van a aparecer las dos.

**5. Falta respaldo teórico para medio LC 2 y parte del LC 3.**
El apunte explica `insertOne`, `insertMany`, `find`, `$gt`, `updateOne`, `$set` y
`deleteOne`. **No** menciona `aggregate`, `$unwind`, `$group`, `$match`, `arrayFilters`,
`$push`, `$pull`, `$size`, `$exists`, la proyección ni `replaceOne` — y el deck pide
el `$unwind` (comparación 3) y el `replaceOne` (LC 3, paso 4). Dos frases alcanzan:

> *"`aggregate` es una cinta de pasos: cada etapa recibe lo que largó la anterior.
> `$unwind` desarma un array en una fila por elemento, para poder contar."*

> *"`replaceOne` no edita: cambia el documento por el que le das. Lo que no mandás, no queda."*

**6. La convención de nombres, otra vez.**
Las colecciones son **singulares** (`estudiante`, `materia`) porque vienen del dataset
del curso, pero el ejercicio del apunte pide `productos`, **plural**. Las dos cosas
están bien escritas según su fuente; si no lo nombrás, alguien va a preguntar.

---

## Si algo se rompe en vivo

```bash
mongosh --eval "db.adminCommand('listDatabases').databases.map(d=>d.name)"
```

```bash
mongosh --eval 'const d=db.getSiblingDB("escuela"); print(d.estudiante.countDocuments(), d.materia.countDocuments())'
```

- `ENOENT ... 00-cargar-escuela.js` → no estás parado en esta carpeta.
- `MongoNetworkError` / `ECONNREFUSED` → MongoDB no está prendido.
- `use escuela` da error de sintaxis → en un archivo va `use("escuela")`.
- Los datos quedaron raros → `mongosh 00-cargar-escuela.js` deja todo como al principio.

Para empezar de cero: `mongosh 00-cargar-escuela.js` (borra y recrea las dos colecciones).

---

## La clase que viene

Clase 09 — **Mongoose**: le pone un esquema con reglas a los documentos. Es la respuesta
al `{ precoi: 200 }` del ejercicio y al typo de la comparación 6. Dejá esa punta abierta
al cerrar.
