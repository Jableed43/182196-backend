# Clase 07 — MySQL2 + Node.js

Base: **`escuela`** (la de la clase 05) · XAMPP/MariaDB · `root` sin password.
Todo corre en cualquier orden y se puede repetir: lo que escribe, lo borra.

```bash
npm install
```

---

## Archivos

Mismos nombres en la raiz y en `resuelto\`. Un archivo por Live Coding del deck.

| archivo | Live Coding de la slide | apunte |
|---|---|---|
| `00-crear-base.sql` | — solo si no tenés `escuela` | — |
| `live-coding-1-pool.js` | **LC 1** · Conectá Node con la base escuela | 1.1 / 1.2 |
| `live-coding-2-consultas-seguras.js` | **LC 2** · Consultas parametrizadas en vivo | 2.1–2.4 |
| `live-coding-3-capas.js` | **LC 3** · Express de cero + arquitectura en capas | 3.1 / 3.2 |
| `ejercicio-biblioteca\` | 📝 Ejercicio de clase, los 7 puntos | — |

Los archivos de apoyo que nombra el deck:

| lo que dice la slide | acá es |
|---|---|
| `config/db.js` | `config\db.js` |
| `env.example` | `env.example` |
| `estudiantes.service.js` | `services\estudiantes.service.js` |
| `estudiantes.routes.js` | `routes\estudiantes.routes.js` |
| `ARQUITECTURA.md` | `ARQUITECTURA.md` |
| — (agregado) | `EXPRESS-DE-CERO.md` |
| `README.md` | `README.md` |

- **Raíz** = el **punto de partida**: los archivos existen con sus imports y los `// TODO:`
  que marcan el orden, sin una línea de lógica. **Es lo que proyectás y tipeás en vivo**, y
  lo mismo que abren ellos.
- **`resuelto\`** = la versión completa, misma estructura y mismos nombres. Es tu red de
  seguridad: si te trabás, abrís el archivo de al lado. **No lo repartas antes de la clase.**
- Las dos carpetas tienen su `node_modules`: no hace falta `npm install` en ninguna.

---

## Cómo correr cada uno

En la raíz vas a correr lo que **vos vayas escribiendo**; hasta que lo escribas, cada
archivo corre y no muestra nada (está todo en `// TODO:`). Para ver cómo tiene que quedar,
el mismo comando dentro de `resuelto\`.

```bash
node live-coding-1-pool.js
```

```bash
node live-coding-2-consultas-seguras.js
```

```bash
node live-coding-3-capas.js
```

```bash
node ejercicio-biblioteca/index.js
```

El ejercicio necesita su base una vez:

```bash
mysql -u root < ejercicio-biblioteca/biblioteca.sql
```

---

## Para grabar

**`GUION-CLASE-07.md`** tiene la clase minuto a minuto: 8 bloques, 2 h 15, con lo que se
tipea en cada uno, lo que hay que decir y qué correr para mostrarlo. Está pensado para
grabar sin estudiantes, así que incluye los momentos donde conviene frenar y las cuatro
advertencias que si no las decís vos nadie va a preguntar.

---

## El orden en que se escribe

| Live Coding | Archivo | Lo que escribís |
|---|---|---|
| 1 | `config/db.js` | el `createPool` y `testConnection` |
| 1 | `live-coding-1-pool.js` | conectar y traer las primeras filas |
| 2 | `services/estudiantes.service.js` | las 6 consultas, todas parametrizadas |
| 2 | `live-coding-2-consultas-seguras.js` | concatenar contra parametrizar |
| 3 | `live-coding-3-capas.js` (paso 0) | Express de cero, en el puerto 3001 |
| 3 | `controllers/` y `routes/` | HTTP, sin una línea de SQL |
| 3 | `live-coding-3-capas.js` (2da parte) | el servidor en capas |
| — | `ejercicio-biblioteca/` | el ejercicio, lo hacen ellos |

Los `// TODO:` están numerados en ese orden dentro de cada archivo.

---

## Lo que tiene que quedar en cada archivo

**LC 1** — de dónde salen los datos de conexión, `testConnection()`, 5 consultas en
paralelo con un solo pool, y el mensaje de error **sin apagar MySQL** (un pool contra
el puerto 3999). El paso 4 de la slide dice apagar XAMPP; esto hace lo mismo sin tocarlo.

**LC 2** — la consulta por id con `?`, por qué `const [rows]` (imprime que `query`
devuelve un array de 2 cosas), `Promise { <pending> }` si te olvidás el `await`, el
`insertId`, el email duplicado (`ER_DUP_ENTRY`), y la comparación completa:

| | resultado real |
|---|---|
| concatenando `' OR '1'='1` | **30 estudiantes** — toda la tabla |
| con `?` y el valor aparte | **0 estudiantes** |

Y el `'; DROP TABLE ...; --`: `mysql2` lo frena con `ER_PARSE_ERROR` porque no acepta
dos sentencias en un `query()`. Está dicho en el archivo que **eso es el último freno,
no la defensa**: se apaga con `multipleStatements: true`.

**LC 3** — tiene **dos partes**, porque Express aparece por primera vez en esta clase.

*Paso 0, Express de cero.* El archivo arranca un servidor mínimo en el **puerto 3001**, se
hace pedidos a sí mismo con `fetch` y lo cierra: todo sale por consola, sin tocar el
navegador. Muestra, en este orden: por qué Express y no el módulo `http` pelado; las cuatro
líneas (`express()`, `app.get`, el handler, `app.listen`); `req.params` (y que **siempre es
string**, incluso en `/eco/7`); `req.query`; el 404 que Express contesta solo; el
**`req.body` undefined** sin `express.json()` y resuelto con él; un middleware propio con
`next()`; el `Cannot set headers after they are sent` provocado a propósito; la tabla de
códigos de estado; y cómo el camino del `Router` se **suma** al del `app.use`.
La versión escrita, para leer, está en `EXPRESS-DE-CERO.md`.

*Segunda parte, el proyecto en capas.* `ARQUITECTURA.md` tiene el recorrido dibujado de
`GET /estudiantes/1` por las cinco capas. Endpoints probados: `GET /`, `GET /estudiantes`,
`GET /estudiantes/1`, `GET /estudiantes/99999` → 404, `POST` → 201, `POST` sin datos → 400,
`PUT` → 200, `DELETE` → 204, URL inexistente → 404.

---

## Los errores que van a aparecer (y están bien)

| código | cuándo | qué demuestra |
|---|---|---|
| `ECONNREFUSED` | MySQL apagado, o puerto equivocado | el pool no puede conectar |
| `ER_DUP_ENTRY` (1062) | email repetido | el `UNIQUE` de la base |
| `ER_NO_REFERENCED_ROW_2` (1452) | libro de un autor que no existe | la FK |
| `ER_PARSE_ERROR` (1064) | `'; DROP TABLE ...` en un `query()` | `mysql2` no apila sentencias |
| `Promise { <pending> }` | te olvidaste el `await` | no es un error: es peor, es silencioso |

---

## Ojo con esto al dar la clase

**1. Cambia la convención de nombres respecto de la clase 06.**
En la 06 enseñaste `Alumnos(id_alumno)`, plural y snake_case. El deck de la 07 y la base
`escuela` usan `estudiante(idestudiante)`, singular y todo junto. **No es un error mío: es
lo que pide el material de esta clase.** Pero si no lo nombrás, el primer `ERROR 1054` de
la clase va a ser alguien escribiendo `id_estudiante`. Una línea alcanza:
*"esta base viene de la clase 05 y usa la convención vieja; la de la 06 era la del apunte nuevo"*.

**2. `DELETE /estudiantes/1` borra las inscripciones en silencio.**
La FK de `inscripcion` está declarada `ON DELETE CASCADE`, así que **no** salta el 1451 que
viste en la clase 06: el estudiante se va y se lleva sus inscripciones. Si lo vas a mostrar
en vivo, mostralo a propósito y conectalo con el `CASCADE` de la clase pasada. Si no querés
tocar los datos, borrá uno que hayas creado en el momento.

**3. El apunte usa `import` pero no dice que hace falta `"type": "module"`.**
Sin esa línea en el `package.json`, el primer `import` tira
`Cannot use import statement outside a module`. Ya está puesta en los dos `package.json`,
en la raiz y en `resuelto\`. Si un estudiante arma su propia carpeta, es el primer paredón.

**4. Falta respaldo teórico para `JOIN`.**
Igual que en la clase 06: el `JOIN` de `librosConAutor()` y el del ejercicio no están
explicados en ningún apunte de SQL del curso. Encuadralo en una frase antes del primero.

**5. `pool.query` vs `pool.execute`.**
El apunte usa `query` con `?` en todo (y así está el código). `mysql2` también tiene
`execute`, que son prepared statements de verdad del lado del servidor. No lo menciona
el material; si alguien pregunta, la respuesta corta es *"`execute` prepara la sentencia
en MySQL y la reutiliza; contra la inyección los dos sirven igual"*.

---

## Si algo se rompe en vivo

```bash
node -e "import('./config/db.js').then(m=>m.testConnection().then(()=>process.exit(0)))"
```

```bash
mysql -u root -e "SELECT COUNT(*) FROM escuela.estudiante"
```

- `Cannot use import statement outside a module` → falta `"type": "module"` en `package.json`.
- `req.body` es `undefined` → falta `app.use(express.json())`, o está **después** de las rutas.
- `Cannot set headers after they are sent` → dos respuestas en el mismo handler (falta un `return`).
- El pedido se queda girando → un middleware sin `next()` y sin respuesta.
- `EADDRINUSE` → quedó un `node` viejo con el puerto 3000 (o el 3001 del paso 0) tomado.
- `Cannot find package 'mysql2'` → falta `npm install` en esa carpeta.
- `ECONNREFUSED` → MySQL apagado en XAMPP.
- `ER_BAD_DB_ERROR` → no existe la base: `mysql -u root < 00-crear-base.sql`.
- El puerto 3000 ocupado → cambiá `PORT` en el `.env`.

Para volver la base al estado original: `mysql -u root < 00-crear-base.sql`
(ojo: eso **borra y recrea** `escuela` con el dataset del curso).
