// =====================================================================
//  EJERCICIO DE CLASE — la capa de datos de una biblioteca (RESUELTO)
// =====================================================================
//  Antes de correr esto:   mysql -u root < biblioteca.sql
//  Correlo con:            node ejercicio-biblioteca/index.js
//
//  Los 7 puntos del enunciado:
//    1. base biblioteca con autores y libros (FK)   -> biblioteca.sql
//    2. db.js con el pool                           -> db.js
//    3. autores.datos.js con las 3 funciones        -> autores.datos.js
//    4. crear 2 autores, listarlos, buscar por nac. -> aca abajo
//    5. pasar ' OR '1'='1 y confirmar que no rompe  -> aca abajo
//    6. try/catch para un dato invalido             -> aca abajo
//    7. IA Mentor (tarea)                           -> al final del archivo
// =====================================================================

import { pool } from "./db.js";
import {
    listarAutores,
    crearAutor,
    buscarPorNacionalidad,
    crearLibro,
    librosConAutor
} from "./autores.datos.js";

// =====================================================================
//  4 · Crear 2 autores, listarlos y buscar por nacionalidad
// =====================================================================
console.log("\n=== 4. Crear, listar y buscar ===");

const idGabo = await crearAutor("Gabriel Garcia Marquez", "Colombiana");
const idCortazar = await crearAutor("Julio Cortazar", "Argentina");
console.log("Autores creados con id:", idGabo, "y", idCortazar);

const autores = await listarAutores();
console.log(`listarAutores() -> ${autores.length} autores`);
console.table(autores);

const argentinos = await buscarPorNacionalidad("Argentina");
console.log(`buscarPorNacionalidad("Argentina") -> ${argentinos.length}:`,
            argentinos.map(a => a.nombre).join(", "));

// Y los libros, que necesitan un autor que exista (la FK)
await crearLibro("Cien anos de soledad", idGabo);
await crearLibro("Rayuela", idCortazar);
console.log("\nLibros con su autor:");
console.table(await librosConAutor());

// =====================================================================
//  5 · Pasar ' OR '1'='1 como nacionalidad
// =====================================================================
console.log("\n=== 5. El ataque que no pasa ===");

const ataque = "' OR '1'='1";

const conParametro = await buscarPorNacionalidad(ataque);
console.log(`buscarPorNacionalidad("${ataque}") -> ${conParametro.length} resultados`);
console.log("Cero. Busco una nacionalidad que se llama literalmente asi.");

// Para que se vea la diferencia, la version MAL (nunca escribir esto):
const [conConcatenacion] = await pool.query(
    `SELECT * FROM autores WHERE nacionalidad = '${ataque}'`
);
console.log(`Concatenando el mismo texto  -> ${conConcatenacion.length} resultados`);
console.log("Todos los autores. El dato se volvio codigo SQL.");

// =====================================================================
//  6 · try/catch para un dato invalido
// =====================================================================
console.log("\n=== 6. try/catch ===");

//  Caso a: un libro de un autor que no existe -> la FK lo rechaza (1452)
try {
    await crearLibro("Libro fantasma", 99999);
} catch (error) {
    console.error("[ERROR]", error.code, "->", error.sqlMessage);
    console.log("La FK impidio un libro sin autor. El programa sigue vivo.");
}

//  Caso b: falta un campo NOT NULL
try {
    await pool.query("INSERT INTO autores (nombre) VALUES (?)", ["Sin nacionalidad"]);
    console.log("(entro igual: tu MySQL no tiene sql_mode estricto)");
} catch (error) {
    console.error("[ERROR]", error.code, "->", error.sqlMessage);
}

console.log("\nSin el try/catch, cualquiera de estos dos tumba el servidor.");

// =====================================================================
//  Limpieza: dejamos la base como estaba para poder repetir el ejercicio
// =====================================================================
await pool.query("DELETE FROM libros");
await pool.query("DELETE FROM autores");
await pool.query("ALTER TABLE libros  AUTO_INCREMENT = 1");
await pool.query("ALTER TABLE autores AUTO_INCREMENT = 1");

await pool.end();

// =====================================================================
//  7 · IA Mentor (tarea)
// =====================================================================
//  "Actua como un experto en seguridad backend. Explicame con un ejemplo
//   como funciona una inyeccion SQL y por que los prepared statements
//   (parametros con '?') la previenen por completo."
// =====================================================================
console.log("\nFin del ejercicio. La base quedo vacia para repetirlo.\n");
