# Clase 07 — MySQL2 + Node.js

Base: **`escuela`** (la de la clase 05) · XAMPP/MariaDB · `root` sin password.

Esta carpeta es el **punto de partida**: los archivos existen con sus imports y con
comentarios `// TODO:` numerados, pero sin lógica. El código se escribe en clase.

La versión completa está en **`resuelto\`**, con la misma estructura y los mismos nombres.

## Antes de arrancar

Las dependencias ya están instaladas. Si hiciera falta: `npm install`.

Si no tenés la base `escuela`:

```bash
mysql -u root < 00-crear-base.sql
```

El `.env` es opcional: sin él, `config/db.js` usa `localhost / root / "" / escuela`,
que es XAMPP tal cual viene.

## El orden

| Live Coding | Archivo | Qué se escribe |
|---|---|---|
| 1 | `config/db.js` | el pool y `testConnection` |
| 1 | `live-coding-1-pool.js` | conectar y traer las primeras filas |
| 2 | `services/estudiantes.service.js` | las 6 consultas, todas parametrizadas |
| 2 | `live-coding-2-consultas-seguras.js` | concatenar contra parametrizar |
| 3 | `live-coding-3-capas.js` (paso 0) | Express de cero, en el puerto 3001 |
| 3 | `controllers/` + `routes/` | HTTP, sin una línea de SQL |
| 3 | `live-coding-3-capas.js` (2da parte) | el servidor en capas |
| — | `ejercicio-biblioteca/` | el ejercicio de clase |

Antes del Live Coding 3, leé **`EXPRESS-DE-CERO.md`**: Express aparece por primera vez
en esta clase. El recorrido de un pedido por las cinco capas está en `ARQUITECTURA.md`.

## Cómo correr

```bash
node live-coding-1-pool.js
```

Hasta que el archivo esté escrito, corre y no muestra nada: es lo esperado. Para ver cómo
tiene que quedar, el mismo comando dentro de `resuelto\`.

El ejercicio necesita su base una vez:

```bash
mysql -u root < ejercicio-biblioteca/biblioteca.sql
```

## Las reglas

| | Concatenar el dato en el string | Prepared statement (`?`) |
|---|---|---|
| El dato puede volverse código SQL | sí, peligroso | no, es solo un valor |
| Vulnerable a inyección SQL | sí | no |
| Cuándo usarlo | **nunca** con datos externos | **siempre** |

```javascript
// MAL: el usuario controla parte del texto SQL
const [u] = await pool.query(`SELECT * FROM usuarios WHERE email = '${email}'`);

// BIEN: el ? es un hueco, el valor viaja aparte
const [u] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
```

Y además:

- **Un solo `createPool` por app**, en `config/db.js`.
- **Toda consulta con `await`**, desestructurando `const [rows]`.
- **`UPDATE` y `DELETE` con `WHERE`**, igual que en SQL puro.
- **El SQL va en el service**: el resto del código no ve consultas.
- **`try/catch`** en todo lo que puede fallar.
