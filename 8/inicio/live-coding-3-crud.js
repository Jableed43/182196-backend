// =====================================================================
//  LIVE CODING 3  --  CRUD de MongoDB
// =====================================================================
//     mongosh live-coding-3-crud.js
//
//  Todo lo que escribas, borralo al final: el archivo se tiene que poder
//  correr dos veces seguidas.
// =====================================================================

// --- 1a. Reset -------------------------------------------------------
load("00-cargar-escuela.js");

use("escuela");

// --- 1b. Como se crea una coleccion ----------------------------------
// TODO 1: mostrar las colecciones que hay
// TODO 2: insertar un documento en una coleccion que NO existe
//         (db.aula.insertOne({...})) y mostrar que aparecio sola.
//         En SQL hacia falta un CREATE TABLE.
// TODO 3: db.aula.drop()

// --- 2. CREATE: insertOne e insertMany -------------------------------
// TODO 4: insertOne de una materia nueva, SIN poner _id.
//         Mostrar el _id que genero Mongo (result.insertedId).
// TODO 5: insertMany de 2 materias mas, y que UNA tenga un campo extra
//         que las otras no tengan (ej: modalidad: "virtual")

// --- 3a. READ: el filtro es un OBJETO --------------------------------
// TODO 6: find({ creditos: 3 })           <- en SQL: WHERE creditos = 3
// TODO 7: find({ creditos: { $gt: 3 } })  <- en SQL: WHERE creditos > 3
//         los operadores empiezan con $
// TODO 8: findOne por un campo
// TODO 9: la proyeccion: traer solo nombre y codigo, sin el _id
//         find(filtro, { nombre: 1, codigo: 1, _id: 0 })

// --- 3b. UPDATE ------------------------------------------------------
// TODO 10: updateOne con $set para cambiar UN campo
// TODO 11: mostrar que el resto del documento quedo intacto
//          (Object.keys del documento)
// TODO 12: updateMany para tocar varios de una
//          OJO: con el filtro {} toca TODA la coleccion

// --- 3c. DELETE ------------------------------------------------------
// TODO 13: mirar antes (find), y despues deleteOne
// TODO 14: mostrar el peligro de deleteMany({}) SIN perder nada:
//          hacete una copia de la coleccion, vaciala, y borra la copia.
//          No hay ROLLBACK en Mongo.

// --- 4. replaceOne ---------------------------------------------------
// TODO 15: antes, mostrar todos los campos del documento (Object.keys)
// TODO 16: replaceOne pasando SOLO dos campos
// TODO 17: volver a mostrar los campos.  Que paso con los otros?
//
//  updateOne + $set  ->  cambia solo lo que le pasas
//  replaceOne        ->  reemplaza el documento ENTERO
//  Es el error silencioso mas caro de Mongo: no da error, borra datos.

// --- Limpieza --------------------------------------------------------
// TODO 18: borrar las materias de prueba y confirmar que quedaron 30
