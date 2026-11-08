// =====================================================================
//  EJERCICIO DE CLASE — la capa de datos de una biblioteca
// =====================================================================
//  Antes:  mysql -u root < ejercicio-biblioteca/biblioteca.sql
//  Correr: node ejercicio-biblioteca/index.js
//
//  1. base biblioteca con autores y libros (FK)  -> biblioteca.sql  (listo)
//  2. db.js con el pool                          -> db.js
//  3. autores.datos.js con las 3 funciones       -> autores.datos.js
//  4. crear 2 autores, listarlos, buscar por nacionalidad
//  5. pasar el texto del ataque y confirmar que no rompe
//  6. try/catch para un dato invalido
//  7. IA Mentor (tarea)
// =====================================================================

import { pool } from "./db.js";
// TODO: importar las funciones de autores.datos.js

// --- 4 ---------------------------------------------------------------
// TODO 1: crear 2 autores y mostrar los ids que devolvio crearAutor
// TODO 2: listarAutores() y mostrarlos con console.table
// TODO 3: buscarPorNacionalidad("Argentina")

// --- 5 ---------------------------------------------------------------
const ataque = `' OR '1'='1`;

// TODO 4: buscarPorNacionalidad(ataque)  -> cuantos resultados da?
// TODO 5: la misma busqueda CONCATENANDO ese texto dentro del SQL
//         -> cuantos da ahora? por que?

// --- 6 ---------------------------------------------------------------
// TODO 6: intentar crearLibro("Libro fantasma", 99999) dentro de try/catch
//         y mostrar error.code  (la FK no deja un libro sin autor)

// TODO 7: borrar lo que insertaste y cerrar el pool con await pool.end()

// --- 7 · IA Mentor (tarea) -------------------------------------------
//  "Actua como un experto en seguridad backend. Explicame con un ejemplo
//   como funciona una inyeccion SQL y por que los prepared statements
//   (parametros con '?') la previenen por completo."
