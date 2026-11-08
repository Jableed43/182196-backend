// =====================================================================
//  EJERCICIO DE CLASE — mi primera coleccion
// =====================================================================
//  Correlo con:   mongosh ejercicio-tienda.js
//
//  1. base `tienda`
//  2. coleccion `productos` con 4 documentos, dos con campos extra
//  3. consultar: todos, los de mas de 100 ($gt), y uno por nombre
//  4. actualizar un precio con updateOne + $set
//  5. borrar un producto con deleteOne
//  6. insertar { precoi: 200 } con el typo y buscar por precio
//  7. IA Mentor (tarea)
// =====================================================================

// --- 1 ---------------------------------------------------------------
use("tienda");

//  OJO: en esta base ya hay una coleccion `producto` (singular) de otra
//  clase. No la toques: el ejercicio usa `productos`, en plural.
db.productos.drop();

// --- 2 ---------------------------------------------------------------
// TODO 1: insertMany con 4 productos (nombre y precio).
//         Que DOS de ellos tengan campos extra, por ejemplo
//         color: "negro"  o  inalambrico: true
// TODO 2: mostrar cuantos campos tiene cada uno (Object.keys(p).length)
//         -> misma coleccion, documentos con forma distinta

// --- 3 ---------------------------------------------------------------
// TODO 3: a) todos los productos
// TODO 4: b) los que cuestan mas de 100   ->  { precio: { $gt: 100 } }
//            en SQL era:  WHERE precio > 100
// TODO 5: c) uno por nombre, con findOne

// --- 4 ---------------------------------------------------------------
// TODO 6: updateOne({ nombre: "Mouse" }, { $set: { precio: 95 } })
//         mostrar el precio antes y despues
// TODO 7: mostrar que el resto del documento quedo igual

// --- 5 ---------------------------------------------------------------
// TODO 8: deleteOne de un producto, y contar los que quedan

// --- 6 ·  EL PUNTO IMPORTANTE ----------------------------------------
// TODO 9: insertOne({ nombre: "Parlante", precoi: 200 })   <- precoi, con typo
// TODO 10: mostrar Object.keys del Parlante, y que .precio da undefined
// TODO 11: volver a buscar { precio: { $gt: 100 } }
//          -> el Parlante NO aparece: para la base "no tiene precio"
// TODO 12: buscar los que NO tienen el campo precio
//          -> { precio: { $exists: false } }
//
//  En SQL, escribir 'precoi' habria sido ERROR 1054 al instante.
//  Aca entro y el error aparece despues, cuando algo no suma.
//  Esto lo arregla Mongoose en la clase 09.

// --- 7 · IA Mentor (tarea) -------------------------------------------
//  "Actua como un arquitecto de datos. Explicame con un ejemplo la
//   diferencia entre consistencia ACID y BASE (consistencia eventual),
//   y por que un banco usa ACID pero un contador de 'likes' puede usar
//   BASE."
