// =====================================================================
//  EJERCICIO DE CLASE — mi primera coleccion (RESUELTO)
// =====================================================================
//  Correlo con:   mongosh ejercicio-tienda.js
//
//  Los 7 puntos del enunciado:
//    1. base `tienda`
//    2. coleccion `productos` con 4 documentos, dos con campos extra
//    3. consultar: todos, los de mas de 100 ($gt), y uno por nombre
//    4. actualizar un precio con updateOne + $set
//    5. borrar un producto con deleteOne
//    6. insertar { precoi: 200 } con el typo y buscar por precio
//    7. IA Mentor (tarea)
//
//  Se puede correr las veces que haga falta: empieza borrando la coleccion.
// =====================================================================

// ---------------------------------------------------------------------
//  1 · La base
// ---------------------------------------------------------------------
use("tienda");

//  OJO: en esta base ya hay una coleccion `producto` (singular) de otra
//  clase. No la tocamos: el ejercicio usa `productos`, en plural, que es
//  como lo escribe el enunciado.
db.productos.drop();

print("\n=== 1. Base y coleccion ===");
print("base: " + db.getName());
print("colecciones antes: " + db.getCollectionNames().join(", "));

// ---------------------------------------------------------------------
//  2 · Cuatro documentos, dos con campos extra
// ---------------------------------------------------------------------
db.productos.insertMany([
    { nombre: "Teclado", precio: 150 },
    { nombre: "Mouse",   precio: 80,  color: "negro", inalambrico: true },
    { nombre: "Monitor", precio: 900 },
    { nombre: "Webcam",  precio: 120, color: "gris" }
]);

print("\n=== 2. Cuatro productos ===");
print("insertados: " + db.productos.countDocuments());
db.productos.find().forEach(p =>
    print("   " + p.nombre.padEnd(10) + " $" + String(p.precio).padEnd(5) +
          "  campos: " + Object.keys(p).length));
print("Teclado y Monitor tienen 3 campos; Mouse 5 y Webcam 4.");
print("Misma coleccion, documentos con forma distinta: esquema flexible.");

// ---------------------------------------------------------------------
//  3 · Consultar
// ---------------------------------------------------------------------
print("\n=== 3. Consultar ===");

print("\na) Todos:");
db.productos.find({}, { _id: 0 }).forEach(p => print("   " + JSON.stringify(p)));

print("\nb) Los que cuestan mas de 100   ->   { precio: { $gt: 100 } }");
print("   en SQL era:  WHERE precio > 100");
db.productos.find({ precio: { $gt: 100 } }, { nombre: 1, precio: 1, _id: 0 })
    .forEach(p => print("   " + p.nombre + ": $" + p.precio));

print("\nc) Uno por nombre   ->   findOne({ nombre: 'Monitor' })");
printjson(db.productos.findOne({ nombre: "Monitor" }));

// ---------------------------------------------------------------------
//  4 · Actualizar un precio
// ---------------------------------------------------------------------
print("\n=== 4. Actualizar ===");
print("Mouse antes: $" + db.productos.findOne({ nombre: "Mouse" }).precio);

const act = db.productos.updateOne(
    { nombre: "Mouse" },             // a quien
    { $set: { precio: 95 } }         // que cambiar
);

print("updateOne -> matched " + act.matchedCount + ", modified " + act.modifiedCount);
print("Mouse ahora: $" + db.productos.findOne({ nombre: "Mouse" }).precio);
print("El resto del documento quedo igual: " +
      Object.keys(db.productos.findOne({ nombre: "Mouse" })).join(", "));

// ---------------------------------------------------------------------
//  5 · Borrar un producto
// ---------------------------------------------------------------------
print("\n=== 5. Borrar ===");
const borrado = db.productos.deleteOne({ nombre: "Monitor" });
print("deleteOne({ nombre: 'Monitor' }) -> " + borrado.deletedCount + " borrado");
print("quedan " + db.productos.countDocuments() + " productos");

// ---------------------------------------------------------------------
//  6 · El typo: { precoi: 200 }
// ---------------------------------------------------------------------
print("\n=== 6. El typo que Mongo no avisa ===");

db.productos.insertOne({ nombre: "Parlante", precoi: 200 });   // precoi, no precio
print("Insertamos { nombre: 'Parlante', precoi: 200 }");
print("Mongo NO protesta: creo un campo nuevo llamado 'precoi'.");

const parlante = db.productos.findOne({ nombre: "Parlante" });
print("   campos del Parlante : " + Object.keys(parlante).join(", "));
print("   parlante.precio     : " + parlante.precio + "   <- no existe");
print("   parlante.precoi     : " + parlante.precoi);

print("\nBuscando los que tienen precio mayor a 100:");
db.productos.find({ precio: { $gt: 100 } }, { nombre: 1, _id: 0 })
    .forEach(p => print("   " + p.nombre));
print("   El Parlante NO aparece: para la base 'no tiene precio'.");

print("\nY los que no tienen el campo precio:");
db.productos.find({ precio: { $exists: false } }, { nombre: 1, _id: 0 })
    .forEach(p => print("   " + p.nombre));

print("\nEn SQL, escribir 'precoi' habria sido ERROR 1054 al instante.");
print("Aca entro y el error aparece semanas despues, cuando algo no suma.");
print("Esto lo arregla Mongoose en la clase 09: le pone un esquema con reglas.");

// ---------------------------------------------------------------------
//  Estado final
// ---------------------------------------------------------------------
print("\n=== Como quedo la coleccion ===");
db.productos.find({}, { _id: 0 }).forEach(p => print("   " + JSON.stringify(p)));

// =====================================================================
//  7 · IA Mentor (tarea)
// =====================================================================
//  "Actua como un arquitecto de datos. Explicame con un ejemplo la
//   diferencia entre consistencia ACID y BASE (consistencia eventual),
//   y por que un banco usa ACID pero un contador de 'likes' puede usar
//   BASE."
// =====================================================================
print("\nFin del ejercicio.\n");
