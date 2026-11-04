-- EJERCICIO DE CLASE — el modelo de una escuela
-- Tablas: Alumnos, Materias, Inscripciones

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- 1 · El modelo ER
-- TODO: dibujá el modelo (podés hacerlo con comentarios acá mismo)

-- 2 · Cardinalidad
-- TODO: qué cardinalidad hay entre Alumnos y Materias?
-- TODO: por qué hace falta la tabla intermedia? Escribí la justificación.

-- 3 · Las tres tablas con sus PK y FK
DROP TABLE IF EXISTS Inscripciones;
DROP TABLE IF EXISTS Alumnos;
DROP TABLE IF EXISTS Materias;

-- TODO: Alumnos       (id_alumno PK AUTO_INCREMENT, nombre, email UNIQUE)
-- TODO: Materias      (id_materia PK, nombre UNIQUE, anio)
-- TODO: Inscripciones (id_inscripcion PK, id_alumno FK, id_materia FK, nota)
--                     + UNIQUE (id_alumno, id_materia)

-- 4 · Los datos
-- TODO: 3 alumnos, 3 materias y 4 inscripciones que los vinculen
-- TODO: mostrá el modelo completo con JOINs: alumno, materia, anio, nota

-- 5 · Cambiar la nota de una inscripción
-- TODO: SELECT primero, UPDATE con su WHERE, SELECT para confirmar

-- 6 · Borrar una materia que tiene inscripciones
-- TODO: contá las inscripciones de cada materia
-- TODO: intentá borrar una que tenga inscripciones.
--       Anotá el error y explicá qué te está protegiendo.
-- TODO: cuál es la secuencia correcta si de verdad querés eliminarla?

-- 7 · IA Mentor (tarea)
--   "Actuá como un diseñador de bases de datos. Explicame con un ejemplo
--    qué es una 'anomalía de actualización' y cómo la normalización hasta
--    3NF la evita."
