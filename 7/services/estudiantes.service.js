// =====================================================================
//  services/estudiantes.service.js  --  LA CAPA DE DATOS
// =====================================================================
//  Reglas para TODAS las funciones de abajo:
//    - await dentro de una funcion async
//    - const [filas] = await pool.query(...)
//    - todo dato externo va con ?
//    - si no hay resultado, devolver null
// =====================================================================
import { pool } from "../config/db.js";

// TODO 1: getEstudiantes()  -> SELECT * FROM estudiante
export const getEstudiantes = async () => {
};

// TODO 2: getEstudianteById(id)  -> WHERE idestudiante = ?
//   si estudiantes.length === 0 devolver null
export const getEstudianteById = async (id) => {
};

// TODO 3: buscarPorApellido(apellido)  -> LIKE ?
//   el % va en el VALOR: [`%${apellido}%`], no pegado al SQL
export const buscarPorApellido = async (apellido) => {
};

// TODO 4: crearEstudiante(datos)  -> INSERT con 5 ?
//   devolver result.insertId
export const crearEstudiante = async (datos) => {
};

// TODO 5: actualizarEstudiante(id, datos)  -> UPDATE ... WHERE (nunca sin WHERE)
//   si result.affectedRows === 0 devolver null
export const actualizarEstudiante = async (id, datos) => {
};

// TODO 6: borrarEstudiante(id)  -> DELETE ... WHERE
//   devolver result.affectedRows > 0
export const borrarEstudiante = async (id) => {
};
