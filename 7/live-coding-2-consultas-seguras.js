// =====================================================================
//  LIVE CODING 2  --  Consultas parametrizadas
// =====================================================================
//  node live-coding-2-consultas-seguras.js
// =====================================================================
import { pool } from "./config/db.js";
// TODO: importar las funciones del service

// --- 1. La consulta por id con ? -------------------------------------
// TODO 1: llamar a getEstudianteById(1) y mostrar el resultado
// TODO 2: llamar a getEstudianteById(99999) y ver que da null, no un error
// TODO 3: hacer pool.query SIN desestructurar y mostrar que devuelve
//         un array de 2 cosas: [0] filas, [1] metadatos
// TODO 4: hacer una query SIN await y mostrar que es Promise { <pending> }

// --- 2. El INSERT y el insertId ---------------------------------------
// TODO 5: crear un estudiante y mostrar el insertId
//         (el email es UNIQUE: usa Date.now() para que no se repita)
// TODO 6: intentar crear OTRO con el mismo email, dentro de try/catch,
//         y mostrar error.code  (va a ser ER_DUP_ENTRY)

// --- 3. Concatenar vs parametrizar ------------------------------------
const loQueEscribeElAtacante = "' OR '1'='1";

// TODO 7: armar la consulta MAL, concatenando ese texto en el string SQL.
//         Mostrar el SQL que queda y cuantas filas devolvio (va a ser TODA la tabla).
// TODO 8: la misma consulta con ? y el valor aparte. Cuantas filas devuelve?
// TODO 9: probar el ataque "1'; DROP TABLE x; -- " y ver que mysql2
//         no permite dos sentencias en un mismo query()

// --- 4. Cada consulta aislada -----------------------------------------
// TODO 10: usar buscarPorApellido y getEstudiantes, sin escribir SQL aca

// TODO 11: borrar el estudiante que insertaste y cerrar el pool
