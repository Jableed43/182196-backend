// =====================================================================
//  LIVE CODING 2  --  Consultas parametrizadas en vivo
// =====================================================================
//  Correlo con:   node live-coding-2-consultas-seguras.js
//
//  Los 4 pasos de la slide:
//    1. La consulta por id con ? y la desestructuracion const [estudiantes]
//    2. El INSERT y de donde sale el insertId
//    3. La concatenacion peligrosa comparada con la version con ?
//    4. Cada consulta aislada (eso es services/estudiantes.service.js)
//
//  NO toca los datos reales: todo lo que escribe lo borra al final.
// =====================================================================

import { pool } from "./config/db.js";
import {
    getEstudiantes,
    getEstudianteById,
    buscarPorApellido,
    crearEstudiante,
    actualizarEstudiante,
    borrarEstudiante
} from "./services/estudiantes.service.js";

// =====================================================================
//  PASO 1 -- la consulta por id, y por que el [rows]
// =====================================================================
console.log("\n=== 1. La consulta por id con ? ===");

const uno = await getEstudianteById(1);
console.log("getEstudianteById(1) ->", uno.nombre, uno.apellido);

const noExiste = await getEstudianteById(99999);
console.log("getEstudianteById(99999) ->", noExiste, "(null, no un error)");

// --- Por que const [rows] y no const rows ---
console.log("\n--- Por que la desestructuracion ---");
const resultadoCompleto = await pool.query("SELECT * FROM estudiante LIMIT 2");
console.log("pool.query devuelve un array de", resultadoCompleto.length, "cosas:");
console.log("  [0] las filas  ->", resultadoCompleto[0].length, "filas");
console.log("  [1] metadatos  ->", resultadoCompleto[1].length, "columnas descriptas");
console.log("Por eso se escribe:  const [rows] = await pool.query(...)");

// --- El error silencioso #1: olvidarse el await ---
console.log("\n--- Y si te olvidas el await? ---");
const sinAwait = pool.query("SELECT * FROM estudiante LIMIT 1");
console.log("sin await ->", sinAwait);
console.log("Eso es una Promesa sin resolver, no los datos.");
await sinAwait;    // la resolvemos para no dejarla colgada

// =====================================================================
//  PASO 2 -- el INSERT y el insertId
// =====================================================================
console.log("\n=== 2. El INSERT y el insertId ===");

const nuevo = await crearEstudiante({
    nombre: "Demo",
    apellido: "DeClase",
    email: `demo.declase.${Date.now()}@escuela.edu`,   // unico: email es UNIQUE
    fecha_nacimiento: "2005-04-12",
    telefono: "341-000-0000"
});
console.log("Insertado con id:", nuevo.idestudiante, "<- eso es result.insertId");
console.log("Es la PK que genero AUTO_INCREMENT. Sin esto no sabrias");
console.log("que id te toco para despues insertar los hijos.");

const actualizado = await actualizarEstudiante(nuevo.idestudiante, { telefono: "341-999-9999" });
console.log("Despues del UPDATE, telefono:", actualizado.telefono);

// --- email duplicado: el UNIQUE lo frena (error 1062) ---
console.log("\n--- Que pasa si el email ya existe ---");
try {
    await crearEstudiante({
        nombre: "Otro", apellido: "Igual",
        email: nuevo.email,                    // el mismo de arriba
        fecha_nacimiento: "2005-01-01", telefono: null
    });
} catch (error) {
    console.error("[ERROR]", error.code, "->", error.sqlMessage);
    console.log("Por esto las consultas van en try/catch: si no, se cae el server.");
}

// =====================================================================
//  PASO 3 -- concatenar vs parametrizar
// =====================================================================
console.log("\n=== 3. Inyeccion SQL: concatenar vs ? ===");

const loQueEscribeElAtacante = "' OR '1'='1";
console.log("El usuario escribe en el buscador:", loQueEscribeElAtacante);

// --- LA FORMA MAL: concatenar el dato dentro del texto SQL ---
const sqlConcatenado = `SELECT * FROM estudiante WHERE apellido = '${loQueEscribeElAtacante}'`;
console.log("\nMAL. El SQL que termina ejecutandose:");
console.log("  ", sqlConcatenado);
const [filasMal] = await pool.query(sqlConcatenado);
console.log("   Devolvio", filasMal.length, "estudiantes. TODA la tabla.");
console.log("   El dato se volvio codigo: el OR '1'='1' es siempre verdadero.");

// --- LA FORMA BIEN: el ? manda el dato por separado ---
const [filasBien] = await pool.query(
    "SELECT * FROM estudiante WHERE apellido = ?",
    [loQueEscribeElAtacante]
);
console.log("\nBIEN. Con ?:");
console.log("   SELECT * FROM estudiante WHERE apellido = ?   +   el valor aparte");
console.log("   Devolvio", filasBien.length, "estudiantes.");
console.log("   Busco un apellido que se llama literalmente \"' OR '1'='1\".");
console.log("   No existe nadie asi, y el dato nunca se interpreto como SQL.");

// --- Y el DROP TABLE? ---
console.log("\n--- El caso grave: '; DROP TABLE ... -- ---");
await pool.query("DROP TABLE IF EXISTS demo_inyeccion");
await pool.query("CREATE TABLE demo_inyeccion (id INT PRIMARY KEY, dato VARCHAR(50))");
await pool.query("INSERT INTO demo_inyeccion VALUES (1, 'dato importante')");
console.log("Tabla de prueba creada (demo_inyeccion), con 1 fila.");

const ataqueDrop = "1'; DROP TABLE demo_inyeccion; -- ";
try {
    await pool.query(`SELECT * FROM demo_inyeccion WHERE dato = '${ataqueDrop}'`);
} catch (error) {
    console.error("[ERROR]", error.code, "- mysql2 no permite dos sentencias en un query()");
    console.log("Ese es el ULTIMO freno, no una defensa: se apaga poniendo");
    console.log("multipleStatements: true en el pool, y entonces la tabla se va.");
}

const [sigue] = await pool.query("SELECT COUNT(*) AS n FROM demo_inyeccion");
console.log("demo_inyeccion sigue existiendo, con", sigue[0].n, "fila.");
await pool.query("DROP TABLE demo_inyeccion");

// =====================================================================
//  PASO 4 -- cada consulta aislada
// =====================================================================
console.log("\n=== 4. Cada consulta en su funcion ===");
console.log("Abri services/estudiantes.service.js: cada consulta es UNA funcion.");
console.log("Desde aca no se ve una sola linea de SQL:");

const todos = await buscarPorApellido("a");
console.log(`  buscarPorApellido('a')  -> ${todos.length} resultados`);
console.log(`  getEstudiantes()        -> ${(await getEstudiantes()).length} resultados`);

// --- limpieza: el estudiante Demo se va ---
const borrado = await borrarEstudiante(nuevo.idestudiante);
console.log(`  borrarEstudiante(${nuevo.idestudiante})  -> ${borrado} (limpiamos lo que insertamos)`);

await pool.end();
console.log("\nFin del live coding 2.\n");
