// =====================================================================
//  EJERCICIO, punto 3 — la capa de datos de autores
// =====================================================================
//  Todo el SQL de `autores` vive aca. Las tres funciones que pide el
//  enunciado, las tres con prepared statement donde hay dato externo.
// =====================================================================

import { pool } from "./db.js";

export async function listarAutores() {
    // Sin dato externo: no hace falta ?, pero igual va con await y [rows].
    const [rows] = await pool.query("SELECT * FROM autores ORDER BY id_autor");
    return rows;
}

export async function crearAutor(nombre, nacionalidad) {
    const [result] = await pool.query(
        "INSERT INTO autores (nombre, nacionalidad) VALUES (?, ?)",
        [nombre, nacionalidad]
    );
    return result.insertId;      // la PK que genero AUTO_INCREMENT
}

export async function buscarPorNacionalidad(nac) {
    //  Punto 3: prepared statement. El dato viene de afuera, va con ?.
    const [rows] = await pool.query(
        "SELECT * FROM autores WHERE nacionalidad = ?",
        [nac]
    );
    return rows;
}

// Extra para el punto 4: un libro necesita un autor que exista (FK).
export async function crearLibro(titulo, idAutor) {
    const [result] = await pool.query(
        "INSERT INTO libros (titulo, id_autor) VALUES (?, ?)",
        [titulo, idAutor]
    );
    return result.insertId;
}

export async function librosConAutor() {
    const [rows] = await pool.query(`
        SELECT l.id_libro, l.titulo, a.nombre AS autor, a.nacionalidad
        FROM libros l
        JOIN autores a ON a.id_autor = l.id_autor
        ORDER BY l.id_libro
    `);
    return rows;
}
