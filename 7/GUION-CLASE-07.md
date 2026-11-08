# Guion — Clase 07 · MySQL2 + Node.js

Para grabar sin estudiantes. **Presupuesto: 2 h 15 min.** Escribís el código en la raíz y
tenés `resuelto\` al lado como referencia.

Los tiempos son un presupuesto, no un cronómetro: si un bloque se estira, el que se recorta
es el 7 (el ejercicio), que igual queda como tarea.

---

## Antes de apretar REC (5 min, fuera de la grabación)

```bash
mysql -u root < 00-crear-base.sql
```

```bash
mysql -u root -e "SELECT COUNT(*) FROM escuela.estudiante"
```

- XAMPP con **MySQL prendido**.
- **30** estudiantes: si no da 30, corré el primer comando otra vez.
- **Puertos 3000 y 3001 libres.** Si quedó un `node` de una prueba, cerralo o al grabar te
  come con `EADDRINUSE`.
- Terminal en la raíz de `7\`, fuente grande, y `resuelto\` abierto en **otra ventana del
  editor** — no en otra pestaña, que al cambiar se ve en cámara.
- Al final de la grabación, para dejar todo como estaba: los dos comandos de arriba más
  `mysql -u root < ejercicio-biblioteca/biblioteca.sql`.

---

## Bloque 0 · Apertura — 8 min · `00:00`

**Qué decir.** Hasta ahora el SQL lo escribían a mano en DBeaver. Hoy el servidor habla con
la base **desde el código**. Al final de la clase hay una API andando que lee y escribe en
MySQL.

**Qué mostrar.** La estructura de la carpeta, sin abrir nada todavía:

```
config/      la conexion
services/    las consultas
controllers/ atiende el pedido
routes/      las URLs
```

**La frase que ancla la clase entera:** *"el SQL va a vivir en un solo lugar, y nada más va
a ver una consulta"*.

Decí también qué **no** entra hoy: validaciones, login, subir archivos. Eso es de la clase
10 en adelante.

---

## Bloque 1 · El pool — 20 min · `00:08`

### 1.1 Qué es un driver (3 min)

Node no sabe hablar MySQL. Un **driver** traduce entre tu JavaScript y el protocolo del
motor. El nuestro es `mysql2`, y lo usamos en su variante de promesas.

```bash
npm list mysql2
```

Mostrá que ya está instalado y decí con qué se instalaría: `npm install mysql2`.

### 1.2 Por qué un pool y no una conexión (4 min)

**Antes de escribir código.** Abrir una conexión es caro: handshake y autenticación. Si
abrís y cerrás una por consulta, con muchos usuarios el servidor se arrastra.

Un **pool** es un conjunto de conexiones ya abiertas que se reutilizan: te presta una libre
y al terminar la devolvés. **La metáfora:** las cajas de un supermercado. No cerrás la caja
después de cada cliente.

### 1.3 Escribir `config/db.js` (8 min)

Abrí el archivo y seguí los dos TODO. Lo que se tipea:

```javascript
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
    host:     process.env.MYSQL_HOST     || "localhost",
    user:     process.env.MYSQL_USER     || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB_NAME  || "escuela",
    port:     Number(process.env.MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```

Mientras escribís, nombrá tres cosas:

- **`mysql2/promise`** y no `mysql2`: queremos `async/await`. Hablarle a la base es I/O —
  el pedido viaja por red y vuelve — y `await` deja escribir esa espera como si fuera
  secuencial, sin bloquear el resto del servidor.
- **`connectionLimit: 10`**: más que eso no abre; las consultas que sobran **esperan en cola**.
- **`export const pool`**: uno solo para toda la app. **Un `createPool` por aplicación.**

Después `testConnection`:

```javascript
export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("[OK] Conexion a MySQL establecida");
        connection.release();
        return true;
    } catch (error) {
        console.error("[ERROR] No se pudo conectar a MySQL:", error.message);
        return false;
    }
};
```

**El detalle que vale señalar:** `connection.release()` **devuelve** la conexión al pool, no
la cierra. Es justo lo contrario de lo que suena.

### 1.4 `live-coding-1-pool.js` y correrlo (5 min)

Lo mínimo para ver algo: llamar a `testConnection()`, traer 3 estudiantes y cerrar el pool.

```javascript
const conectado = await testConnection();

if (conectado) {
    const [rows] = await pool.query("SELECT * FROM estudiante LIMIT 3");
    console.table(rows.map(e => ({ id: e.idestudiante, nombre: e.nombre })));
}

await pool.end();
```

```bash
node live-coding-1-pool.js
```

**No expliques todavía** el `[rows]` ni el `await`: decí "ya vamos a ver por qué va entre
corchetes" y seguí. Es el bloque 2.

**El cierre del bloque — mostrá el error.** El paso 4 de la slide dice apagar MySQL en
XAMPP. En una grabación eso es un bajón de ritmo: hacelo con un pool contra un puerto donde
no hay nadie, que está en `resuelto\live-coding-1-pool.js`.

```javascript
const poolRoto = mysql.createPool({ host: "localhost", user: "root",
                                    password: "", database: "escuela",
                                    port: 3999, connectionLimit: 1 });
try { await poolRoto.getConnection(); }
catch (error) { console.error("[ERROR]", error.code); }
await poolRoto.end();
```

Sale `ECONNREFUSED`: *"no hay nadie escuchando en ese puerto"*. Ese es el mensaje que van a
ver si se olvidan de prender XAMPP.

**El `await pool.end()` del final** merece una frase: acá se cierra porque es un script que
termina. En un servidor Express **no se cierra nunca**: queda vivo mientras corra la app.

---

## Bloque 2 · Consultas seguras — 35 min · `00:28`

El bloque más importante de la clase. Si algo se recorta, no es este.

### 2.1 Por qué `const [rows]` (5 min)

Antes de tocar el service, un experimento en `live-coding-2-consultas-seguras.js`:

```javascript
const resultadoCompleto = await pool.query("SELECT * FROM estudiante LIMIT 2");
console.log("devuelve un array de", resultadoCompleto.length, "cosas");
console.log("  [0] las filas ->", resultadoCompleto[0].length);
console.log("  [1] metadatos ->", resultadoCompleto[1].length);
```

`pool.query` devuelve **dos** cosas: las filas y los metadatos. Por eso se desestructura
`const [rows]` — nos queda la primera y tiramos la segunda.

**Y el error silencioso número uno:**

```javascript
const sinAwait = pool.query("SELECT * FROM estudiante LIMIT 1");
console.log(sinAwait);     // Promise { <pending> }
```

Sin `await` no son los datos: es una **promesa sin resolver**. Mostralo, porque van a
tropezar con esto y el síntoma es confuso: `rows.length` da `undefined` y nada falla.

### 2.2 El service, consulta por consulta (12 min)

Abrí `services/estudiantes.service.js` y escribí los 6 TODO. Antes de empezar, leé en voz
alta las cuatro reglas del encabezado: `await` en función `async`, `const [filas]`, todo
dato externo con `?`, y devolver `null` cuando no hay resultado.

Las dos que hay que escribir despacio:

```javascript
export const getEstudianteById = async (id) => {
    const query = "SELECT * FROM estudiante WHERE idestudiante = ?";
    const [estudiantes] = await pool.query(query, [id]);

    if (estudiantes.length === 0) {
        return null;              // no existe: null, no un error
    }
    return estudiantes[0];
};
```

```javascript
export const crearEstudiante = async (datos) => {
    const { nombre, apellido, email, fecha_nacimiento, telefono } = datos;
    const query = `INSERT INTO estudiante
                       (nombre, apellido, email, fecha_nacimiento, telefono)
                   VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [
        nombre, apellido, email, fecha_nacimiento, telefono ?? null
    ]);
    return { idestudiante: result.insertId, ...datos };
};
```

**Dos cosas que decir acá:**

- En el `INSERT`, el primer valor **no son filas**: son metadatos. `result.insertId` es la
  PK que generó `AUTO_INCREMENT`, y `result.affectedRows` cuántas filas se tocaron. Sin el
  `insertId` no sabés qué id te tocó para después insertar los hijos.
- En `buscarPorApellido`, el `%` del `LIKE` va **en el valor**, no pegado al SQL:
  `[` + `` `%${apellido}%` `` + `]`. El `?` sigue siendo un hueco.

Las otras cuatro (`getEstudiantes`, `actualizar`, `borrar`) son el mismo patrón: escribilas
seguidas, sin frenar. En `actualizar` y `borrar` nombrá el `WHERE`: igual que en SQL puro.

### 2.3 `insertId` en vivo (3 min)

```javascript
const nuevo = await crearEstudiante({
    nombre: "Demo", apellido: "DeClase",
    email: `demo.${Date.now()}@escuela.edu`,
    fecha_nacimiento: "2005-04-12", telefono: "341-000-0000"
});
console.log("insertId:", nuevo.idestudiante);
```

El `Date.now()` en el email no es decorativo: `email` es `UNIQUE`. Decilo, y aprovechá para
mostrar el `ER_DUP_ENTRY` insertando el mismo email dos veces dentro de un `try/catch`.

**La frase:** *"sin el try/catch, esto no es un error que se loguea: es el servidor que se cae"*.

### 2.4 ⭐ Inyección SQL — el momento de la clase (12 min)

No lo cuentes: **hacelo**.

```javascript
const loQueEscribeElAtacante = "' OR '1'='1";

const sqlConcatenado = `SELECT * FROM estudiante WHERE apellido = '${loQueEscribeElAtacante}'`;
console.log(sqlConcatenado);
const [filasMal] = await pool.query(sqlConcatenado);
console.log("devolvio", filasMal.length, "estudiantes");
```

Mostrá **el SQL que termina ejecutándose** antes de correrlo:

```
SELECT * FROM estudiante WHERE apellido = '' OR '1'='1'
```

Dale unos segundos de aire. Ahí se entiende solo: el `OR '1'='1'` es siempre verdadero.
Devuelve **los 30**.

```javascript
const [filasBien] = await pool.query(
    "SELECT * FROM estudiante WHERE apellido = ?",
    [loQueEscribeElAtacante]
);
console.log("devolvio", filasBien.length, "estudiantes");
```

**Cero.** Buscó un apellido que se llama literalmente `' OR '1'='1`. No existe nadie así.

**La explicación del mecanismo, que es lo que hay que que quede:** un prepared statement
manda el SQL y los datos **por separado**. El motor primero recibe la consulta con el hueco
y después el valor. Por eso el dato **no puede volverse código**: ya es tarde, la consulta
estaba decidida.

**Y el caso grave.** El `'; DROP TABLE ...; --`, sobre una tabla descartable para no perder
nada — está en `resuelto\live-coding-2-consultas-seguras.js`. Sale `ER_PARSE_ERROR`, y
**acá hay que ser honesto**: eso no es la defensa, es el último freno. `mysql2` no acepta
dos sentencias en un `query()`, pero se apaga con `multipleStatements: true`. La defensa es
el `?`.

Cerrá con la tabla del apunte:

| | concatenar | con `?` |
|---|---|---|
| el dato puede volverse código SQL | sí | no |
| vulnerable a inyección | sí | no |
| cuándo usarlo | **nunca** con datos externos | **siempre** |

---

## Bloque 3 · Pausa y recapitulación — 7 min · `01:03`

Buen punto de corte si vas a partir el video en dos.

Repasá sin mirar el código: un pool por app · toda consulta con `await` y `const [rows]` ·
siempre `?` con datos externos · `UPDATE` y `DELETE` con `WHERE`.

Y planteá el problema que viene: *"tenemos las consultas, pero las estamos llamando desde un
script. ¿Cómo las usa un servidor de verdad, cuando el pedido llega por HTTP?"*

---

## Bloque 4 · Express de cero — 25 min · `01:10`

Express aparece **por primera vez** en esta clase. La teoría escrita está en
`EXPRESS-DE-CERO.md`; el paso 0 de `resuelto\live-coding-3-capas.js` lo ejecuta todo y
escupe el resultado por consola, sin tocar el navegador.

### 4.1 Qué problema resuelve (4 min)

Mostrá el `http.createServer` pelado, con la cadena de `if` y el body que llega por pedazos.
Con cinco rutas es inmanejable. **Express es una capa arriba de ese mismo módulo `http`** y
da tres cosas: un **router**, **middlewares** y **atajos** (`req.params`, `req.body`,
`res.json`, `res.status`). No es un lenguaje nuevo: es una librería.

### 4.2 Las cuatro líneas (4 min)

```javascript
import express from "express";
const demo = express();
demo.get("/hola", (req, res) => res.json({ mensaje: "hola" }));
demo.listen(3001);
```

**Lo que hay que dejar claro:** `demo.get` **registra** la ruta, no la ejecuta. El handler
corre recién cuando llega un pedido que coincide con el método y el camino. Y hasta el
`listen` nada escuchaba.

### 4.3 `req` (5 min)

```javascript
demo.get("/eco/:texto", (req, res) => {
    res.json({ recibido: req.params.texto, tipo: typeof req.params.texto });
});
```

Pedí `/eco/7` y mostrá que `tipo` es **`string`**. `req.params` siempre trae strings, nunca
números: es la fuente de la mitad de los bugs de comparación.

Después `/buscar?apellido=lopez` → eso es `req.query`. Y una URL que no existe → **404**,
que Express contesta solo.

### 4.4 ⭐ `req.body` undefined (5 min)

El error número uno de la clase que viene, provocado hoy a propósito:

```javascript
demo.post("/sin-json", (req, res) => res.json({ tipo: typeof req.body }));
```

Mandale un JSON. `req.body` es **`undefined`**. Ahí agregás el middleware:

```javascript
demo.use(express.json());
```

Y el mismo POST ahora sí trae el objeto. **La frase:** *"Express recorre lo que registraste
de arriba hacia abajo; si `express.json()` va después de las rutas, no sirve"*.

### 4.5 Middleware propio y `next()` (4 min)

```javascript
demo.use((req, res, next) => { pedidosVistos++; next(); });
```

**`next()` no es opcional.** Un middleware que no llama a `next()` ni contesta deja el pedido
esperando para siempre: el navegador gira y no hay error en la consola. Decilo explícito,
porque es un síntoma que no se parece a nada.

### 4.6 Contestar dos veces (3 min)

```javascript
demo.get("/dos-veces", (req, res) => {
    res.json({ respuesta: 1 });
    res.json({ respuesta: 2 });     // explota
});
```

`Cannot set headers after they are sent to the client`. **Por cada pedido se contesta una
sola vez.** De acá sale el `return` antes de cada `res.status(...)` de los controllers —
mostralo apenas los escribas en el bloque siguiente.

Cerrá con la tabla de códigos: `200` · `201` creaste algo · `204` bien y sin cuerpo · `400`
el cliente mandó mal · `404` no existe · `409` conflicto · `500` se rompió algo tuyo.

---

## Bloque 5 · Las capas — 25 min · `01:35`

### 5.1 El controller (10 min)

Antes de escribirlo, la regla: **el controller no tiene SQL, ni una línea.** Saca los datos
del `req`, llama a **una** función del service, y decide el código de estado.

```javascript
export const obtenerPorId = async (req, res) => {
    try {
        const estudiante = await getEstudianteById(req.params.id);

        if (!estudiante) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar el estudiante" });
    }
};
```

Señalá el **`return`** del 404: es el bloque 4.6 aplicado. Y señalá la traducción: el service
devolvió `null`, y acá eso **se convierte** en un 404. El service no sabe qué es un 404 y el
controller no sabe qué es un `SELECT`.

En `crear`, los dos casos que importan: faltan datos → **400**; `ER_DUP_ENTRY` → **409**.

Las otras tres son el mismo molde: escribilas seguidas.

### 5.2 Las rutas (4 min)

```javascript
export const estudiantesRouter = Router();

estudiantesRouter.get("/",       listar);
estudiantesRouter.get("/:id",    obtenerPorId);
estudiantesRouter.post("/",      crear);
estudiantesRouter.put("/:id",    actualizar);
estudiantesRouter.delete("/:id", borrar);
```

**Lo que se equivoca todo el mundo:** adentro del router las rutas van **relativas**. El
camino se suma: `app.use("/estudiantes", router)` + `"/:id"` = `GET /estudiantes/7`. Si
escribís `"/estudiantes"` adentro del router, la URL termina en `/estudiantes/estudiantes`.

### 5.3 El server y el recorrido (11 min)

```javascript
app.use(express.json());                      // 1. primero el middleware
app.use("/estudiantes", estudiantesRouter);   // 2. las rutas
app.use((req, res) => {                       // 3. el 404, AL FINAL
    res.status(404).json({ error: `No existe ${req.method} ${req.path}` });
});

const conectado = await testConnection();
if (!conectado) process.exit(1);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
```

Tres frases:

- El **404 va al final** porque es el `app.use` que atrapa lo que no coincidió con nada de
  arriba. Si lo ponés primero, no funciona nada.
- `testConnection()` **antes** del `listen`: si MySQL está apagado conviene saberlo al
  arrancar, no en el primer pedido de un usuario.
- El pool **no se cierra**: queda vivo mientras el servidor corra.

**Y ahora la prueba, que es el cierre del bloque.** Abrí `ARQUITECTURA.md` y recorré el
dibujo mientras pedís las URLs:

```bash
node live-coding-3-capas.js
```

| pedido | qué sale | qué demuestra |
|---|---|---|
| `GET /estudiantes` | 200 con los 30 | el camino completo anda |
| `GET /estudiantes/1` | 200 con uno | `req.params` |
| `GET /estudiantes/99999` | **404** | el `null` del service traducido |
| `GET /nada` | **404** | el middleware del final |

El POST y el PUT no se pueden probar desde el navegador. Con `curl`:

```bash
curl -X POST http://localhost:3000/estudiantes -H "Content-Type: application/json" -d "{\"nombre\":\"Ana\",\"apellido\":\"Perez\",\"email\":\"ana@escuela.edu\",\"fecha_nacimiento\":\"2004-01-01\"}"
```

Y sin el header `Content-Type`, para cerrar el círculo con el bloque 4.4: `req.body` vuelve
a llegar vacío y salta el **400**.

**El recorrido dicho en voz alta, una vez:** `routes` → `controller` → `service` → `pool` →
MySQL, y vuelve por el mismo camino convertido en JSON.

---

## Bloque 6 · Cierre — 8 min · `02:00`

La Regla de Oro, leída:

- Un solo `createPool` por app, en `config/db.js`.
- Toda consulta con `await`, desestructurando `const [rows]`.
- **Siempre `?`** con datos externos. Nunca concatenar.
- `UPDATE` y `DELETE` con `WHERE`.
- El SQL va en el service: el resto del código no ve consultas.
- `try/catch` en todo lo que puede fallar.

Y el enganche: esta capa de datos es **exactamente** la que se conecta a las rutas de
Express de la clase 10 en adelante. Cada ruta HTTP va a llamar a una de estas funciones.
Separar hoy ahorra reescribir mañana.

---

## Bloque 7 · El ejercicio — 7 min · `02:08`

El que se recorta si el tiempo no da. Leé el enunciado y dejalo planteado, no lo resuelvas:

1. Base `biblioteca` con `autores` y `libros` (con FK) → `ejercicio-biblioteca/biblioteca.sql`
2. `db.js` con el pool
3. `autores.datos.js` con `listarAutores()`, `crearAutor()` y `buscarPorNacionalidad()`
4. Crear 2 autores, listarlos, buscar por nacionalidad
5. Pasar `' OR '1'='1` como nacionalidad y confirmar que no rompe
6. `try/catch` para un dato inválido
7. IA Mentor: *"Actuá como un experto en seguridad backend. Explicame con un ejemplo cómo
   funciona una inyección SQL y por qué los prepared statements la previenen por completo."*

La solución completa está en `resuelto\ejercicio-biblioteca\`.

---

## Las cuatro cosas que tenés que nombrar sí o sí

Están en el `INDICE.md` con más detalle. En una grabación no hay nadie que pregunte, así que
si no las decís quedan sin decir:

1. **Cambia la convención de nombres respecto de la clase 06.** Ahí era `Alumnos(id_alumno)`;
   acá la base `escuela` viene de la clase 05 y usa `estudiante(idestudiante)`. Es lo que
   pide el material de esta clase, pero si no lo nombrás, el primer `ERROR 1054` de alguien
   va a ser escribir `id_estudiante`.
2. **`DELETE /estudiantes/1` borra las inscripciones en silencio.** La FK de `inscripcion`
   es `ON DELETE CASCADE`: no salta el 1451 de la clase pasada. Si lo vas a mostrar,
   mostralo a propósito y conectalo con el `CASCADE`.
3. **`"type": "module"` en el `package.json`.** Sin esa línea, el primer `import` tira
   `Cannot use import statement outside a module`. Está puesta; decí que está y por qué.
4. **El `JOIN` no se enseña en ninguna clase de SQL del curso.** Aparece en el ejercicio
   (`librosConAutor`). Una frase: *"esto pega dos tablas por la columna que comparten; lo
   vemos en detalle más adelante"*.

---

## Si algo se rompe grabando

| lo que ves | qué es |
|---|---|
| `Cannot find package 'mysql2'` | estás parado en otra carpeta |
| `Cannot use import statement outside a module` | falta `"type": "module"` |
| `ECONNREFUSED` | MySQL apagado en XAMPP |
| `ER_BAD_DB_ERROR` | no existe la base: `mysql -u root < 00-crear-base.sql` |
| `EADDRINUSE` | quedó un `node` con el 3000 (o el 3001) tomado |
| `Promise { <pending> }` | te olvidaste un `await` |
| `Cannot set headers after they are sent` | dos respuestas en el mismo handler |
| el pedido gira y no vuelve | un middleware sin `next()` |

Y si te trabás escribiendo: el archivo equivalente en `resuelto\` tiene la versión completa,
con los mismos nombres y en el mismo orden.
