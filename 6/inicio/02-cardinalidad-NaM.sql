-- 02 — Cardinalidad N:M · Alumnos, Materias e Inscripciones

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- PARTE 1 · La forma que la clase dice que NO hay que usar
DROP TABLE IF EXISTS Alumnos_mal;

-- TODO: Alumnos_mal (id_alumno, nombre, materias VARCHAR(200))
--       con las materias separadas por comas en un solo campo
-- TODO: insertá 3 alumnos asi
-- TODO: contá los que cursan Fisica con LIKE
-- TODO: agregá un alumno de "Fisica II" y volvé a contar. Que pasó?
-- TODO: y la nota de Ana en Fisica, dónde la guardarías?

-- PARTE 2 · La forma correcta: tabla intermedia
DROP TABLE IF EXISTS Inscripciones;
DROP TABLE IF EXISTS Alumnos;
DROP TABLE IF EXISTS Materias;

-- TODO: Alumnos       (id_alumno, nombre, email UNIQUE)
-- TODO: Materias      (id_materia, nombre UNIQUE)
-- TODO: Inscripciones (id_inscripcion, id_alumno FK, id_materia FK, nota)
--                     + UNIQUE (id_alumno, id_materia)

-- TODO: 3 alumnos, 4 materias y 6 inscripciones

-- Las mismas preguntas, ahora con JOINs:
-- TODO: cuántos alumnos cursan Fisica (exacto, sin LIKE)
-- TODO: cuántas materias cursa cada alumno
-- TODO: qué nota se sacó Ana en Fisica
-- TODO: renombrá una materia. Cuántas filas tocaste?
-- TODO: el promedio de cada alumno

-- TODO: intentá inscribir dos veces al mismo alumno a la misma materia
-- TODO: intentá inscribir un alumno que no existe
