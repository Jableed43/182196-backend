// =====================================================================
//  LIVE CODING 3  --  CRUD de MongoDB en vivo
// =====================================================================
//  Correlo PARADO EN ESTA CARPETA:
//     mongosh live-coding-3-crud.js
//
//  Los 4 pasos de la slide:
//    1. Reset de los datos, y como se crean las colecciones
//    2. Insertar con insertOne y insertMany
//    3. Leer, actualizar y borrar
//    4. replaceOne: destruye los campos que no se mandan
//
//  Todo lo que escribe lo borra: se puede repetir las veces que haga falta.
// =====================================================================

// ---------------------------------------------------------------------
//  PASO 1a -- reset
// ---------------------------------------------------------------------
print("\n=== 1. Reset de los datos ===");
load("00-cargar-escuela.js");

use("escuela");
print("estudiante: " + db.estudiante.countDocuments() +
      "   materia: " + db.materia.countDocuments());

// ---------------------------------------------------------------------
//  PASO 1b -- como se crea una coleccion
// ---------------------------------------------------------------------
print("\n--- Como se crea una coleccion ---");
print("Colecciones ahora: " + db.getCollectionNames().join(", "));

print("\nEn SQL hacia falta un CREATE TABLE con todas las columnas.");
print("Aca la coleccion se crea sola en el primer insert:");

db.aula.insertOne({ nombre: "Aula 12", piso: 1 });
print("   db.aula.insertOne(...)  ->  " + db.getCollectionNames().join(", "));
print("   Nadie declaro la coleccion 'aula'. Aparecio con el primer documento.");

db.aula.drop();
print("   db.aula.drop()          ->  " + db.getCollectionNames().join(", "));

// =====================================================================
//  PASO 2 -- CREATE: insertOne e insertMany
// =====================================================================
print("\n=== 2. insertOne e insertMany ===");

// --- insertOne: un documento ---
const uno = db.materia.insertOne({
    nombre: "Taller de Mongo",
    codigo: "MON1",
    creditos: 3,
    docente: { nombre: "Javier", apellido: "Lopez", especialidad: "Backend" }
});
print("insertOne  -> _id generado: " + uno.insertedId);
print("   No le pusimos _id: lo genero Mongo (un ObjectId).");
print("   Las otras materias tienen _id numerico porque se cargo a mano.");

// --- insertMany: varios de una ---
const varios = db.materia.insertMany([
    { nombre: "Taller de Express", codigo: "EXP1", creditos: 3 },
    { nombre: "Taller de React",   codigo: "REA1", creditos: 3, modalidad: "virtual" }
]);
print("\ninsertMany -> " + Object.keys(varios.insertedIds).length + " documentos insertados");
print("   Fijate que el segundo tiene un campo 'modalidad' que los otros no.");
print("   Misma coleccion, campos distintos: eso es el esquema flexible.");

print("\nmaterias ahora: " + db.materia.countDocuments() + " (eran 30)");

// =====================================================================
//  PASO 3a -- READ: el filtro es un OBJETO, no un string
// =====================================================================
print("\n=== 3. Leer ===");

print("\nSQL:    SELECT * FROM materia WHERE creditos = 3;");
print("Mongo:  db.materia.find({ creditos: 3 })");
print("   -> " + db.materia.countDocuments({ creditos: 3 }) + " materias");

print("\nSQL:    WHERE creditos > 3");
print("Mongo:  { creditos: { $gt: 3 } }     <- los operadores empiezan con $");
print("   -> " + db.materia.countDocuments({ creditos: { $gt: 3 } }) + " materias");

print("\nUno solo, por un campo:");
printjson(db.materia.findOne({ codigo: "MON1" }));

print("\nSolo algunos campos (la proyeccion, el SELECT de columnas):");
const proyectadas = db.materia.find(
    { codigo: { $in: ["MON1", "EXP1", "REA1"] } },
    { nombre: 1, codigo: 1, _id: 0 }          // 1 = traelo, 0 = no lo traigas
).toArray();
proyectadas.forEach(m => print("   " + m.codigo + "  " + m.nombre));

// =====================================================================
//  PASO 3b -- UPDATE: $set cambia solo lo que le decis
// =====================================================================
print("\n=== Actualizar ===");

print("\nAntes:  creditos = " + db.materia.findOne({ codigo: "MON1" }).creditos);

const act = db.materia.updateOne(
    { codigo: "MON1" },                  // a quien (el filtro, como el WHERE)
    { $set: { creditos: 5 } }            // que cambiar
);
print("updateOne -> matched: " + act.matchedCount + ", modified: " + act.modifiedCount);
print("Despues: creditos = " + db.materia.findOne({ codigo: "MON1" }).creditos);

const antes = db.materia.findOne({ codigo: "MON1" });
print("\nEl resto del documento quedo intacto: " + Object.keys(antes).join(", "));
print("$set toca SOLO los campos que le pasas. Acordate de esto para el paso 4.");

// --- updateMany toca muchos ---
const muchos = db.materia.updateMany(
    { codigo: { $in: ["EXP1", "REA1"] } },
    { $set: { es_taller: true } }
);
print("\nupdateMany -> " + muchos.modifiedCount + " documentos tocados de una.");
print("OJO: con el filtro vacio {} toca TODA la coleccion. Es el UPDATE sin WHERE.");

// =====================================================================
//  PASO 3c -- DELETE
// =====================================================================
print("\n=== Borrar ===");

print("Antes de borrar, mirar (igual que en SQL):");
print("   db.materia.find({ codigo: 'REA1' })  -> " +
      db.materia.countDocuments({ codigo: "REA1" }) + " documento");

const borrado = db.materia.deleteOne({ codigo: "REA1" });
print("deleteOne -> " + borrado.deletedCount + " borrado");
print("materias ahora: " + db.materia.countDocuments());

print("\nOJO -- deleteMany({}) con el filtro VACIO borra TODA la coleccion.");
print("Es el mismo peligro que el DELETE sin WHERE de la clase 06.");
print("Lo vemos sin perder nada, en una copia:");

db.materia_copia.drop();
db.materia_copia.insertMany(db.materia.find().toArray());
print("   copia creada con " + db.materia_copia.countDocuments() + " documentos");
const masacre = db.materia_copia.deleteMany({});
print("   db.materia_copia.deleteMany({})  ->  " + masacre.deletedCount + " borrados");
print("   quedan " + db.materia_copia.countDocuments() + ". Y no hay ROLLBACK.");
db.materia_copia.drop();

// =====================================================================
//  PASO 4 -- replaceOne: el que destruye lo que no mandas
// =====================================================================
print("\n=== 4. replaceOne destruye los campos que no mandas ===");

const original = db.materia.findOne({ codigo: "MON1" });
print("\nAntes del replaceOne, el documento tiene:");
print("   " + Object.keys(original).join(", "));
print("   docente: " + original.docente.nombre + " " + original.docente.apellido);

db.materia.replaceOne(
    { codigo: "MON1" },
    { nombre: "Taller de Mongo", codigo: "MON1" }   // SOLO estos dos campos
);

const despues = db.materia.findOne({ codigo: "MON1" });
print("\nDespues del replaceOne:");
print("   " + Object.keys(despues).join(", "));
print("   docente: " + despues.docente);
print("   creditos: " + despues.creditos);

print("\nSe fueron docente y creditos. replaceOne REEMPLAZA el documento");
print("entero: lo que no mandas, se pierde.");
print("   updateOne + $set  ->  cambia solo lo que le pasas  (es lo que queres)");
print("   replaceOne        ->  tira el documento viejo y pone el nuevo");
print("Es el error silencioso mas caro de Mongo: no da error, borra datos.");

// =====================================================================
//  Limpieza: dejamos la escuela como la cargo el live coding 1
// =====================================================================
db.materia.deleteMany({ codigo: { $in: ["MON1", "EXP1", "REA1"] } });
print("\n(limpiamos las 3 materias de prueba)");
print("materias: " + db.materia.countDocuments() + "   estudiante: " +
      db.estudiante.countDocuments());

print("\nFin del live coding 3.\n");
