// =====================================================================
//  EJERCICIO, punto 3 — la capa de datos de autores
// =====================================================================
//  Todo el SQL de `autores` vive aca.
// =====================================================================

import { pool } from "./db.js";

// TODO 1: listarAutores()  -> SELECT * FROM autores
export async function listarAutores() {
}

// TODO 2: crearAutor(nombre, nacionalidad)  -> INSERT con 2 signos de ?
//         devolver result.insertId
export async function crearAutor(nombre, nacionalidad) {
}

// TODO 3: buscarPorNacionalidad(nac)  -> WHERE nacionalidad = ?
//         ESTA es la que el enunciado pide con prepared statement
export async function buscarPorNacionalidad(nac) {
}

// TODO 4 (extra): crearLibro(titulo, idAutor)  -> INSERT en libros
export async function crearLibro(titulo, idAutor) {
}
