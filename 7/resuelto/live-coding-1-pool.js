// =====================================================================
//  LIVE CODING 1  --  Conecta Node con la base escuela
// =====================================================================
//  Correlo con:   node live-coding-1-pool.js
//
//  Los 4 pasos de la slide:
//    1. Copiar env.example a .env  (opcional: sin .env usa los defaults)
//    2. Abrir config/db.js y ubicar createPool y testConnection
//    3. Correr y ver el mensaje de conexion correcta
//    4. Apagar MySQL y volver a probar para ver el mensaje de error
// =====================================================================

import mysql from "mysql2/promise";
import { pool, testConnection } from "./config/db.js";

// ---------------------------------------------------------------------
//  PASO 1 y 2 -- que configuracion quedo cargada
// ---------------------------------------------------------------------
console.log("\n--- 1 y 2. De donde salen los datos de conexion ---");
console.log("host    :", process.env.MYSQL_HOST     || "localhost  (default)");
console.log("user    :", process.env.MYSQL_USER     || "root       (default)");
console.log("database:", process.env.MYSQL_DB_NAME  || "escuela    (default)");
console.log("password:", process.env.MYSQL_PASSWORD ? "(definida en .env)" : "(vacia, como en XAMPP)");
console.log("Sin .env el pool usa los valores por defecto de config/db.js.");

// ---------------------------------------------------------------------
//  PASO 3 -- la conexion funciona
// ---------------------------------------------------------------------
console.log("\n--- 3. testConnection() ---");
const conectado = await testConnection();

if (conectado) {
    // Primera consulta de la clase. Ojo: va con await y con [rows].
    const [rows] = await pool.query("SELECT * FROM estudiante LIMIT 3");
    console.log(`\nLa base responde: ${rows.length} estudiantes traidos`);
    console.table(rows.map(e => ({ id: e.idestudiante, nombre: e.nombre, apellido: e.apellido })));

    // El pool presta conexiones y las reutiliza: 5 consultas en paralelo
    // sin abrir 5 conexiones nuevas (connectionLimit: 10).
    const enParalelo = await Promise.all([
        pool.query("SELECT COUNT(*) AS n FROM estudiante"),
        pool.query("SELECT COUNT(*) AS n FROM materia"),
        pool.query("SELECT COUNT(*) AS n FROM docente"),
        pool.query("SELECT COUNT(*) AS n FROM inscripcion"),
        pool.query("SELECT DATABASE() AS base")
    ]);
    console.log("5 consultas en paralelo, un solo pool:");
    console.log("  estudiantes :", enParalelo[0][0][0].n);
    console.log("  materias    :", enParalelo[1][0][0].n);
    console.log("  docentes    :", enParalelo[2][0][0].n);
    console.log("  inscripciones:", enParalelo[3][0][0].n);
    console.log("  base en uso :", enParalelo[4][0][0].base);
}

// ---------------------------------------------------------------------
//  PASO 4 -- el mensaje de error, SIN tener que apagar MySQL
// ---------------------------------------------------------------------
//  En la slide dice apagar MySQL en XAMPP. Esto muestra lo mismo pero
//  con un pool apuntando a un puerto donde no hay nadie escuchando,
//  asi no hay que tocar XAMPP en medio de la clase.
// ---------------------------------------------------------------------
console.log("\n--- 4. Y si MySQL no esta? ---");

const poolRoto = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "escuela",
    port: 3999,                 // aca no hay ningun MySQL
    connectionLimit: 1
});

try {
    await poolRoto.getConnection();
} catch (error) {
    console.error("[ERROR] No se pudo conectar a MySQL:", error.message || error.code);
    console.error("        ECONNREFUSED = no hay nadie escuchando en ese puerto");
    console.log("Ese es el mensaje que vas a ver si MySQL esta apagado.");
}
await poolRoto.end();

// ---------------------------------------------------------------------
//  Cerrar el pool para que el proceso termine.
//  En un servidor Express NO se cierra: queda vivo mientras corre la app.
// ---------------------------------------------------------------------
await pool.end();
console.log("\nPool cerrado. Fin del live coding 1.\n");
