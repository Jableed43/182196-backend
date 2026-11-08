// =====================================================================
//  LIVE CODING 2  --  Las comparaciones entre SQL y Mongo
// =====================================================================
//  Las mismas preguntas, en los dos modelos. La pregunta no es cual es
//  mejor, sino QUE SE GANA Y QUE SE PIERDE en cada caso.
//
//  Correlo PARADO EN ESTA CARPETA:
//     mongosh live-coding-2-comparaciones.js
//
//  O bloque por bloque, copiando cada seccion dentro de mongosh.
//  Necesita los datos cargados: corre antes el live coding 1.
//
//  Los 3 pasos de la slide:
//    1. Correr las seis comparaciones una por una
//    2. Frenar en la 4 (duplicacion) y preguntarles que pasa
//    3. Mostrar la 5 y la 6: sin FK y con esquema flexible
// =====================================================================

use("escuela");

// Red de seguridad: si todavia no corriste el live coding 1, los datos
// se cargan solos. Asi este archivo tambien puede ser el primero.
if (db.estudiante.countDocuments() === 0) {
    print("(no habia datos: cargando 00-cargar-escuela.js)");
    load("00-cargar-escuela.js");
    use("escuela");
}

// =====================================================================
//  1 -- "Dame todo lo de un estudiante"
// =====================================================================
print("\n=== 1. Dame todo lo de un estudiante ===");
print("SQL: hay que unir 3 tablas");
print("   SELECT e.nombre, m.nombre AS materia, i.nota");
print("   FROM inscripcion i");
print("   JOIN estudiante e ON i.idestudiante = e.idestudiante");
print("   JOIN materia    m ON i.idmateria    = m.idmateria");
print("   WHERE e.idestudiante = 5;");
print("   -> 5 filas, con nombre y apellido REPETIDOS en cada una");

const e5 = db.estudiante.findOne({ _id: 5 });
print("\nMongo: un solo documento");
print("   db.estudiante.findOne({ _id: 5 })");
print("   -> " + e5.nombre + " " + e5.apellido + ", con sus " +
      e5.inscripciones.length + " inscripciones adentro. Una sola lectura.");

print("\nGANA MONGO. En SQL el dato esta desarmado en 3 tablas y hay que");
print("rearmarlo en cada consulta. Aca ya esta armado como lo vas a mostrar.");

// =====================================================================
//  2 -- "Que estudiantes no cursan nada?"
// =====================================================================
print("\n=== 2. Que estudiantes no cursan nada? ===");
print("SQL: LEFT JOIN + IS NULL");
print("   SELECT e.nombre FROM estudiante e");
print("   LEFT JOIN inscripcion i ON e.idestudiante = i.idestudiante");
print("   WHERE i.idinscripcion IS NULL;");

const sinCursar = db.estudiante.find(
    { inscripciones: { $size: 0 } },
    { nombre: 1, apellido: 1, _id: 0 }
).toArray();

print("\nMongo: el array esta vacio");
print("   db.estudiante.find({ inscripciones: { $size: 0 } })");
print("   -> " + sinCursar.length + ": " +
      sinCursar.map(x => x.nombre + " " + x.apellido).join(", "));

print("\nEMPATE, pero Mongo es mas corto: no hay que entender el LEFT JOIN.");

// =====================================================================
//  3 -- "Cuantos inscriptos tiene cada materia?"
// =====================================================================
print("\n=== 3. Cuantos inscriptos tiene cada materia? ===");
print("SQL: es lo natural, un GROUP BY de una linea");
print("   SELECT m.nombre, COUNT(*) FROM inscripcion i");
print("   JOIN materia m ON i.idmateria = m.idmateria");
print("   GROUP BY m.idmateria HAVING COUNT(*) > 5;");

const populares = db.estudiante.aggregate([
    { $unwind: "$inscripciones" },                       // 1. desarmar el array
    { $group: { _id: "$inscripciones.materia", inscriptos: { $sum: 1 } } },
    { $match: { inscriptos: { $gt: 5 } } },
    { $sort: { inscriptos: -1 } }
]).toArray();

print("\nMongo: hay que DESARMAR los arrays primero, con $unwind");
print("   -> " + populares.length + " materias con mas de 5 inscriptos:");
populares.forEach(m => print("      " + m._id + ": " + m.inscriptos));

print("\nGANA SQL. Embebimos las inscripciones adentro del estudiante, asi que");
print("para contar por materia hay que desarmarlas. Optimizamos para leer un");
print("estudiante y pagamos el precio aca.");

// =====================================================================
//  4 -- Cambio el nombre de una materia   <-- FRENA ACA Y PREGUNTALES
// =====================================================================
print("\n=== 4. Cambio el nombre de una materia ===");
print("SQL: el nombre esta en UN solo lugar, la tabla materia");
print("   UPDATE materia SET nombre = 'Programacion 1' WHERE idmateria = 1;");
print("   -> 1 fila. Listo. Eso es la normalizacion de la clase 06.");

const cuantos = db.estudiante.countDocuments({ "inscripciones.materia": "Programación I" });
print("\nMongo: el nombre esta DUPLICADO adentro de cada estudiante.");
print("   db.materia.updateOne(...)        -> 1 documento");
print("   pero quedan " + cuantos + " estudiantes con el nombre viejo adentro.");

print("\n>>> PREGUNTA PARA LA CLASE:");
print("    que pasa si cambia un dato que esta repetido en 20 documentos?");
print("    (respuesta: hay que actualizarlo en los 20, y si te olvidas");
print("     uno queda inconsistente para siempre)");

print("\n--- Hagamoslo ---");
db.materia.updateOne({ _id: 1 }, { $set: { nombre: "Programacion 1" } });
const r = db.estudiante.updateMany(
    { "inscripciones.materia": "Programación I" },
    { $set: { "inscripciones.$[elem].materia": "Programacion 1" } },
    { arrayFilters: [{ "elem.materia": "Programación I" }] }
);
print("Materia actualizada: 1 documento");
print("Estudiantes que hubo que tocar ADEMAS: " + r.modifiedCount);
print("En SQL eran 0. Ese es el costo de la duplicacion.");

// deshacer, para que el archivo se pueda correr de nuevo
db.materia.updateOne({ _id: 1 }, { $set: { nombre: "Programación I" } });
db.estudiante.updateMany(
    { "inscripciones.materia": "Programacion 1" },
    { $set: { "inscripciones.$[elem].materia": "Programación I" } },
    { arrayFilters: [{ "elem.materia": "Programacion 1" }] }
);
print("(lo dejamos como estaba para poder repetir el archivo)");

print("\nGANA SQL, y por mucho. Es exactamente la anomalia de actualizacion");
print("de la clase 06.");

// =====================================================================
//  5 -- Inscribir a alguien en una materia que no existe
// =====================================================================
print("\n=== 5. Inscribir en una materia que no existe ===");
print("SQL: la FK lo rechaza");
print("   INSERT INTO inscripcion (idestudiante, idmateria) VALUES (1, 999);");
print("   -> ERROR 1452: Cannot add or update a child row");

db.estudiante.updateOne(
    { _id: 1 },
    { $push: { inscripciones: { materia: "Materia Inventada", codigo: "XXX", nota: null } } }
);
const inventada = db.estudiante.findOne({ _id: 1 }).inscripciones
                    .filter(i => i.codigo === "XXX").length;

print("\nMongo: entra sin chistar.");
print("   db.estudiante.updateOne({ _id: 1 }, { $push: { inscripciones: {...} } })");
print("   -> " + inventada + " inscripcion a 'Materia Inventada', que NO existe");
print("      en la coleccion materia: " +
      db.materia.countDocuments({ codigo: "XXX" }) + " documentos con ese codigo.");

db.estudiante.updateOne({ _id: 1 }, { $pull: { inscripciones: { codigo: "XXX" } } });
print("(deshecho)");

print("\nGANA SQL. Mongo NO tiene foreign keys: la integridad referencial");
print("es tu problema, en el codigo. Nadie te avisa.");

// =====================================================================
//  6 -- Guarda un estudiante con otros campos
// =====================================================================
print("\n=== 6. Un estudiante con otros campos ===");
print("SQL: la tabla define las columnas");
print("   INSERT INTO estudiante (nombre, instagram) VALUES ('Ana', '@ana');");
print("   -> ERROR 1054: Unknown column 'instagram'");
print("   Para agregarlo hay que hacer un ALTER TABLE.");

db.estudiante.insertOne({
    _id: 999,
    nombre: "Ana",
    apellido: "Nueva",
    email: "ana.nueva@email.com",
    instagram: "@ana",                    // campo que ningun otro tiene
    hobbies: ["ajedrez", "guitarra"],     // y un array
    inscripciones: []
});

print("\nMongo: entra, y nadie se queja.");
const ana = db.estudiante.findOne({ _id: 999 });
print("   campos de Ana      : " + Object.keys(ana).join(", "));
print("   campos de Sofia (5): " + Object.keys(db.estudiante.findOne({ _id: 5 })).join(", "));
print("   En la MISMA coleccion, con campos distintos.");

print("\n--- Y el doble filo: el typo ---");
db.estudiante.insertOne({ _id: 998, nombre: "Pedro", emial: "pedro@mail.com" });
print("   Insertamos { nombre: 'Pedro', emial: ... }  <- 'emial', con typo");
print("   Mongo NO avisa: creo un campo nuevo llamado 'emial'.");
print("   Buscando por email -> " +
      JSON.stringify(db.estudiante.findOne({ _id: 998 }).email));
print("   Pedro 'no tiene email'. En SQL habria sido ERROR 1054 al instante.");
print("   Eso lo arregla Mongoose, en la clase 09.");

db.estudiante.deleteMany({ _id: { $in: [998, 999] } });
print("(limpiamos los dos documentos de prueba)");

print("\nEMPATE, y es el corazon de la clase: la flexibilidad sirve cuando");
print("los datos varian de verdad, y te traiciona cuando te equivocas.");

print("\n=== Resumen de las 6 ===");
print("   1 dame todo de un estudiante .... gana Mongo");
print("   2 quienes no cursan nada ........ empate");
print("   3 contar por materia ............ gana SQL");
print("   4 cambio un dato duplicado ...... gana SQL, y por mucho");
print("   5 materia que no existe ......... gana SQL (no hay FK en Mongo)");
print("   6 campos distintos / typo ....... empate, es el doble filo");
print("\nNo hay ganador universal: hay un dato correcto para cada modelo.\n");
