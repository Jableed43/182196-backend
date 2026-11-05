-- =====================================================================
--  EJERCICIO DE CLASE — el modelo de una escuela (resuelto)
-- =====================================================================
--  Los 7 puntos del enunciado, en orden.
--  Tablas: Alumnos, Materias, Inscripciones (los nombres del apunte).
-- =====================================================================

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- =====================================================================
--  1 · El modelo ER
-- =====================================================================
--
--     Alumnos            Inscripciones              Materias
--     --------           -------------              --------
--     id_alumno (PK) 1─N id_alumno  (FK)            id_materia (PK)
--     nombre             id_materia (FK)  N─1        nombre
--     email              nota                        anio
--
-- =====================================================================
--  2 · Cardinalidad y por qué hace falta la tabla intermedia
-- =====================================================================
--  Cardinalidad Alumnos <-> Materias: N:M
--    · un alumno cursa muchas materias
--    · una materia la cursan muchos alumnos
--
--  ¿Por qué la tabla intermedia?
--    Porque no hay dónde poner la FK. Si Alumnos guardara id_materia,
--    cabría UNA materia por alumno. Si Materias guardara id_alumno,
--    cabría UN alumno por materia. Ninguna de las dos alcanza.
--    Inscripciones guarda una fila por CADA combinación, y además tiene
--    lugar para los datos del vínculo: la nota.
--    (La nota no es del alumno ni de la materia: es de la cursada.)

-- =====================================================================
--  3 · Las tres tablas con sus PK y FK
-- =====================================================================
DROP TABLE IF EXISTS Inscripciones;
DROP TABLE IF EXISTS Alumnos;
DROP TABLE IF EXISTS Materias;

CREATE TABLE Alumnos (
    id_alumno INT PRIMARY KEY AUTO_INCREMENT,
    nombre    VARCHAR(100) NOT NULL,
    email     VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE Materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    nombre     VARCHAR(100) NOT NULL UNIQUE,
    anio       INT NOT NULL
);

CREATE TABLE Inscripciones (
    id_inscripcion INT PRIMARY KEY AUTO_INCREMENT,
    id_alumno      INT NOT NULL,
    id_materia     INT NOT NULL,
    nota           DECIMAL(4,2),
    FOREIGN KEY (id_alumno)  REFERENCES Alumnos(id_alumno),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia),
    -- un alumno no puede inscribirse dos veces a la misma materia:
    CONSTRAINT uq_inscripcion UNIQUE (id_alumno, id_materia)
);

-- =====================================================================
--  4 · 3 alumnos, 3 materias y 4 inscripciones
-- =====================================================================
INSERT INTO Alumnos (nombre, email) VALUES
    ('Camila', 'camila@escuela.edu'),
    ('Tomas',  'tomas@escuela.edu'),
    ('Julia',  'julia@escuela.edu');

INSERT INTO Materias (nombre, anio) VALUES
    ('Matematica', 1),
    ('Lengua',     1),
    ('Historia',   2);

INSERT INTO Inscripciones (id_alumno, id_materia, nota) VALUES
    (1, 1, 8.00),
    (1, 2, 9.50),
    (2, 1, 6.75),
    (3, 3, NULL);     -- cursando, sin nota todavía

-- El modelo completo, legible:
SELECT a.nombre AS alumno, m.nombre AS materia, m.anio, i.nota
FROM Inscripciones i
JOIN Alumnos  a ON a.id_alumno  = i.id_alumno
JOIN Materias m ON m.id_materia = i.id_materia
ORDER BY a.nombre, m.nombre;

-- =====================================================================
--  5 · Cambiar la nota de una inscripción
--      (SELECT primero, UPDATE después, SELECT para confirmar)
-- =====================================================================

-- Paso 1 — ¿a quién le voy a cambiar la nota?
SELECT i.id_inscripcion, a.nombre AS alumno, m.nombre AS materia, i.nota
FROM Inscripciones i
JOIN Alumnos  a ON a.id_alumno  = i.id_alumno
JOIN Materias m ON m.id_materia = i.id_materia
WHERE i.id_inscripcion = 3;

-- Paso 2 — el UPDATE, con el mismo WHERE
UPDATE Inscripciones
SET nota = 7.50
WHERE id_inscripcion = 3;

-- Paso 3 — confirmar
SELECT id_inscripcion, id_alumno, id_materia, nota
FROM Inscripciones
WHERE id_inscripcion = 3;

-- =====================================================================
--  6 · Borrar una materia que tiene inscripciones
-- =====================================================================

-- Antes de intentarlo: ¿cuántas inscripciones tiene cada materia?
SELECT m.nombre, COUNT(i.id_inscripcion) AS inscripciones
FROM Materias m
LEFT JOIN Inscripciones i ON i.id_materia = m.id_materia
GROUP BY m.id_materia, m.nombre;

-- Ahora sí. Descomentá y ejecutá:
-- DELETE FROM Materias WHERE id_materia = 1;
--
-- ERROR 1451: Cannot delete or update a parent row: a foreign key
--             constraint fails
--
-- La integridad referencial impide dejar 2 inscripciones apuntando a una
-- materia que ya no existe. Para borrarla hay que decidir primero qué
-- pasa con esas inscripciones.

-- La secuencia correcta: los hijos primero, el padre después.
START TRANSACTION;
    DELETE FROM Inscripciones WHERE id_materia = 1;
    DELETE FROM Materias      WHERE id_materia = 1;
    SELECT nombre FROM Materias;   -- quedan Lengua e Historia
ROLLBACK;                          -- lo deshacemos para no perder los datos

SELECT nombre FROM Materias;       -- las tres otra vez

-- =====================================================================
--  7 · IA Mentor (tarea)
-- =====================================================================
--  "Actuá como un diseñador de bases de datos. Explicame con un ejemplo
--   qué es una 'anomalía de actualización' y cómo la normalización hasta
--   3NF la evita."
-- =====================================================================
