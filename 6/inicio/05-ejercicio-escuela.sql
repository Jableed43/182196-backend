-- EJERCICIO DE CLASE: el modelo de una escuela.

USE modelado;

-- 1 y 2 · El modelo y su cardinalidad
-- TODO: dibujá el modelo (podés hacerlo con comentarios acá mismo)
-- TODO: ¿qué cardinalidad hay entre alumno y materia?
-- TODO: ¿por qué hace falta una tabla intermedia? Escribí la justificación.

-- 3 · Las tres tablas con sus PK y FK
DROP TABLE IF EXISTS esc_inscripcion;
DROP TABLE IF EXISTS esc_alumno;
DROP TABLE IF EXISTS esc_materia;

-- TODO: esc_alumno      (idalumno, nombre, email UNIQUE)
-- TODO: esc_materia     (idmateria, nombre UNIQUE, anio)
-- TODO: esc_inscripcion (idinscripcion, idalumno FK, idmateria FK,
--                        fecha, nota) + UNIQUE (idalumno, idmateria)

-- 4 · Los datos
-- TODO: 3 alumnos, 3 materias y 4 inscripciones que los vinculen

-- TODO: mostrá el modelo completo con JOINs: alumno, materia, nota

-- 5 · Cambiar la nota de una inscripción
-- TODO: SELECT primero, UPDATE después, SELECT para confirmar

-- 6 · Borrar una materia que tiene inscripciones
-- TODO: contá sus inscripciones y después intentá borrarla.
--       Anotá el error y explicá qué te está protegiendo.
-- TODO: ¿cuál es la secuencia correcta si de verdad querés eliminarla?
