// =====================================================================
//  LIVE CODING 1  --  Los mismos datos en dos modelos
// =====================================================================
//  Correlo PARADO EN ESTA CARPETA:
//     mongosh live-coding-1-dos-modelos.js
// =====================================================================

// --- 1. Cargar los datos ---------------------------------------------
//  El dataset ya esta hecho en 00-cargar-escuela.js. Esta linea lo corre.
load("00-cargar-escuela.js");

use("escuela");

// --- 2. Cuatro tablas contra dos colecciones -------------------------
// TODO 1: mostrar cuantas colecciones hay y como se llaman
//         db.getCollectionNames()
// TODO 2: contar los documentos de cada una
//         db.estudiante.countDocuments()
// TODO 3: responder: que paso con las tablas `docente` e `inscripcion`?
//         (pista: mira adentro de un documento de materia y de estudiante)
// TODO 4: traer una materia con findOne({ codigo: "BD1" }) y mostrar
//         que el docente esta ADENTRO del documento
// TODO 5: traer el estudiante _id 5 y listar sus inscripciones
//         (en SQL eso era un JOIN de 3 tablas)

// --- 3. El vocabulario -----------------------------------------------
// TODO 6: escribir la tabla de equivalencias
//         tabla -> coleccion, fila -> documento, PK -> _id, etc.

// TODO 7: insertar un documento SIN _id en una coleccion de prueba
//         y mostrar el _id que genero Mongo (es un ObjectId).
//         Despues: _id.getTimestamp() trae la fecha de creacion adentro.
//         Acordate de hacer drop() de la coleccion de prueba.
