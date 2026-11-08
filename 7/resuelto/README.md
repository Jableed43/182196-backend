# Clase 07 — MySQL2 + Node.js (RESUELTO)

> Esta es la **versión completa**, para consultar si te trabás en vivo.
> Lo que se escribe en clase está en la carpeta de arriba.

Base: **`escuela`** (la misma de la clase 05) · XAMPP/MariaDB · `root` sin password.

## Preparar

Las dependencias ya están instaladas (`node_modules` está en esta carpeta, y también
en la de arriba). Si hiciera falta reinstalar: `npm install`.

Si no tenés la base, o la desordenaste:

```bash
mysql -u root < 00-crear-base.sql
```

El `.env` es **opcional**: sin él, `config/db.js` usa `localhost / root / "" / escuela`,
que es exactamente XAMPP. Copiá `env.example` a `.env` solo si tu servidor es distinto.

## Correr

```bash
node live-coding-1-pool.js
```

```bash
node live-coding-2-consultas-seguras.js
```

```bash
node live-coding-3-capas.js
```

Ese último tiene dos partes: primero **Express de cero** en el puerto 3001 (todo por
consola) y después el proyecto en capas en el 3000. La teoría escrita está en
`EXPRESS-DE-CERO.md`.

```bash
node ejercicio-biblioteca.js
```

## Lo que no se negocia (Regla de Oro del apunte)

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
