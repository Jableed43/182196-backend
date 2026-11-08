// =====================================================================
//  LIVE CODING 2  --  Las comparaciones entre SQL y Mongo
// =====================================================================
//  Las mismas preguntas, en los dos modelos.
//  Necesita los datos cargados: corre antes el live coding 1.
//
//     mongosh live-coding-2-comparaciones.js
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
//  SQL: JOIN de 3 tablas (inscripcion + estudiante + materia)
// TODO 1: el equivalente en Mongo es UNA linea. Escribila.
//         Cuantas inscripciones trae adentro?
//  Quien gana?

// =====================================================================
//  2 -- "Que estudiantes no cursan nada?"
// =====================================================================
//  SQL: LEFT JOIN + IS NULL
// TODO 2: en Mongo el array esta vacio. Filtro: { $size: 0 }
//  Quien gana?

// =====================================================================
//  3 -- "Cuantos inscriptos tiene cada materia?"
// =====================================================================
//  SQL: GROUP BY de una linea
// TODO 3: en Mongo hay que DESARMAR el array primero, con aggregate:
//            { $unwind: "$inscripciones" }
//            { $group: { _id: "...", inscriptos: { $sum: 1 } } }
//            { $match: { inscriptos: { $gt: 5 } } }
//  Quien gana? Por que?

// =====================================================================
//  4 -- Cambio el nombre de una materia      <-- LA IMPORTANTE
// =====================================================================
//  SQL: UPDATE materia SET nombre = ... WHERE idmateria = 1;  -> 1 fila
// TODO 4: contar cuantos ESTUDIANTES tienen ese nombre duplicado adentro
//            db.estudiante.countDocuments({ "inscripciones.materia": "..." })
// TODO 5: cambiarlo en los dos lados y mostrar cuantos documentos hubo
//         que tocar ademas de la materia
// TODO 6: dejarlo como estaba, para poder repetir el archivo
//
//  >>> PREGUNTA PARA LA CLASE: que pasa si te olvidas uno?

// =====================================================================
//  5 -- Inscribir a alguien en una materia que no existe
// =====================================================================
//  SQL: ERROR 1452, la FK lo rechaza
// TODO 7: en Mongo, hacer un $push de una inscripcion a una materia
//         inventada. Entra? Alguien avisa?
// TODO 8: deshacerlo con $pull
//
//  Conclusion: Mongo no tiene foreign keys.

// =====================================================================
//  6 -- Guarda un estudiante con otros campos
// =====================================================================
//  SQL: ERROR 1054, Unknown column 'instagram'
// TODO 9: insertar un estudiante con campos que ningun otro tiene
//         y comparar Object.keys() con los de otro estudiante
// TODO 10: insertar uno con un TYPO en un campo ("emial" en vez de "email")
//          y mostrar que .email da undefined
// TODO 11: borrar los documentos de prueba

// TODO 12: escribir el resumen de las 6: quien gana cada una
