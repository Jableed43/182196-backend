// =====================================================================
//  LIVE CODING 1  --  Los mismos datos en dos modelos
// =====================================================================
//  Correlo PARADO EN ESTA CARPETA:
//     mongosh live-coding-1-dos-modelos.js
//
//  Los 3 pasos de la slide:
//    1. Cargar la escuela en MongoDB con los mismos datos que en MySQL
//    2. Comparar los dos modelos: 4 tablas en SQL contra 2 colecciones
//    3. Repasar el vocabulario equivalente
// =====================================================================

// ---------------------------------------------------------------------
//  PASO 1 -- cargar los datos
// ---------------------------------------------------------------------
//  El dataset vive en 00-cargar-escuela.js, que es el archivo que
//  nombra la slide. Se puede correr las veces que haga falta.
// ---------------------------------------------------------------------
print("\n=== 1. Cargando la escuela en MongoDB ===");
load("00-cargar-escuela.js");

use("escuela");

// ---------------------------------------------------------------------
//  PASO 2 -- cuatro tablas contra dos colecciones
// ---------------------------------------------------------------------
print("\n=== 2. Cuatro tablas en SQL, dos colecciones en Mongo ===");

print("\nEn MySQL hacian falta 4 tablas:");
print("   docente       estudiante");
print("   materia       inscripcion   <- la tabla intermedia N:M");

print("\nAca hay " + db.getCollectionNames().length + " colecciones: " +
      db.getCollectionNames().join(", "));
print("   estudiante : " + db.estudiante.countDocuments() + " documentos");
print("   materia    : " + db.materia.countDocuments() + " documentos");

print("\nQue paso con las otras dos:");
print("   docente     -> va EMBEBIDO adentro de cada materia");
print("   inscripcion -> va EMBEBIDA adentro de cada estudiante");
print("   La tabla intermedia N:M, imprescindible en SQL, aca no existe.");

// --- Una materia: el docente esta adentro ---
print("\n--- Una materia, con su docente adentro ---");
printjson(db.materia.findOne({ codigo: "BD1" }));

// --- Un estudiante: sus inscripciones estan adentro ---
print("\n--- Un estudiante, con sus inscripciones adentro ---");
const alumno = db.estudiante.findOne({ _id: 5 });
print(alumno.nombre + " " + alumno.apellido +
      " tiene " + alumno.inscripciones.length + " inscripciones, EN EL MISMO documento:");
alumno.inscripciones.forEach(i => print("   " + i.materia + "  nota: " + i.nota));

print("\nEn SQL eso era un JOIN de 3 tablas. Aca es un findOne.");

// ---------------------------------------------------------------------
//  PASO 3 -- el vocabulario equivalente
// ---------------------------------------------------------------------
print("\n=== 3. El vocabulario ===");
print("   SQL                      MongoDB");
print("   ----------------------   ----------------------");
print("   Base de datos            Base de datos");
print("   Tabla                    Coleccion");
print("   Fila / registro          Documento");
print("   Columna / campo          Campo");
print("   PK (el id que definis)   _id (lo genera Mongo solo)");
print("   Esquema fijo             Esquema flexible");

// --- El _id lo genera Mongo solo ---
print("\n--- El _id automatico ---");
db.demo_id.drop();
db.demo_id.insertOne({ nombre: "sin id puesto a mano" });
const generado = db.demo_id.findOne();
print("Insertamos { nombre: ... } sin _id. Mongo puso:");
print("   _id = " + generado._id + "   (tipo: " + generado._id.constructor.name + ")");
print("Un ObjectId trae adentro la fecha de creacion: " +
      generado._id.getTimestamp().toISOString());
db.demo_id.drop();

print("\nFin del live coding 1.\n");
