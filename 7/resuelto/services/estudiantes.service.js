// =====================================================================
//  services/estudiantes.service.js  --  LA CAPA DE DATOS
// =====================================================================
//  Bloque 3 del apunte (3.1 y 3.2).
//  Todo el SQL de "estudiante" vive aca y en ningun otro lado.
//  El resto del codigo llama a estas funciones y nunca ve una consulta.
//
//  Reglas que se cumplen en TODAS las funciones de abajo:
//    - toda consulta va con await, dentro de una funcion async
//    - se desestructura const [filas] (el 2do valor son metadatos)
//    - todo dato que viene de afuera va con ? (prepared statement)
//    - si no hay resultado se devuelve null, no se lanza un error
// =====================================================================

import { pool } from "../config/db.js";

// ---------------------------------------------------------------------
//  LEER todos
// ---------------------------------------------------------------------
export const getEstudiantes = async () => {
    const query = "SELECT * FROM estudiante ORDER BY idestudiante";
    const [estudiantes] = await pool.query(query);
    return estudiantes;
};

// ---------------------------------------------------------------------
//  LEER uno por id   <-- la consulta con ? de la slide
// ---------------------------------------------------------------------
export const getEstudianteById = async (id) => {
    const query = "SELECT * FROM estudiante WHERE idestudiante = ?";
    const [estudiantes] = await pool.query(query, [id]);

    if (estudiantes.length === 0) {
        return null;              // no existe: null, no un error
    }
    return estudiantes[0];
};

// ---------------------------------------------------------------------
//  BUSCAR por apellido (LIKE tambien va con ?)
// ---------------------------------------------------------------------
export const buscarPorApellido = async (apellido) => {
    const query = "SELECT * FROM estudiante WHERE apellido LIKE ?";
    const [estudiantes] = await pool.query(query, [`%${apellido}%`]);
    //  El % va en el VALOR, no pegado al SQL. El ? sigue siendo un hueco.
    return estudiantes;
};

// ---------------------------------------------------------------------
//  CREAR  --  de aca sale el insertId
// ---------------------------------------------------------------------
export const crearEstudiante = async (datos) => {
    const { nombre, apellido, email, fecha_nacimiento, telefono } = datos;

    const query = `INSERT INTO estudiante
                       (nombre, apellido, email, fecha_nacimiento, telefono)
                   VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [
        nombre, apellido, email, fecha_nacimiento, telefono ?? null
    ]);

    //  result NO son filas: son metadatos.
    //    result.insertId      -> la PK que genero AUTO_INCREMENT
    //    result.affectedRows  -> cuantas filas se insertaron
    return { idestudiante: result.insertId, ...datos };
};

// ---------------------------------------------------------------------
//  ACTUALIZAR  --  siempre con WHERE
// ---------------------------------------------------------------------
export const actualizarEstudiante = async (id, datos) => {
    const query = "UPDATE estudiante SET telefono = ? WHERE idestudiante = ?";
    const [result] = await pool.query(query, [datos.telefono, id]);

    if (result.affectedRows === 0) {
        return null;              // no habia ningun estudiante con ese id
    }
    return await getEstudianteById(id);
};

// ---------------------------------------------------------------------
//  BORRAR  --  siempre con WHERE
// ---------------------------------------------------------------------
export const borrarEstudiante = async (id) => {
    const query = "DELETE FROM estudiante WHERE idestudiante = ?";
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0;    // true si borro algo
};
