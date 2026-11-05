-- #####################################################################
-- #
-- #   LIVE CODING 1 - Relaciones reales en el dataset
-- #
-- #####################################################################
--
--   Pasos de la slide:
--
--     1. Ubica la relacion 1:N entre materia y docente.
--     2. Busca la tabla intermedia de la relacion N:M.
--     3. Identifica en cada tabla cual es la PK y cuales son las FK.
--
--   Archivos de apoyo de la catedra (base `escuela`, no `modelado`):
--
--     CODIGO/backend/mysql/1/sql/escuela.sql          1:N materia-docente + tabla inscripcion
--     CODIGO/backend/mysql/5/sql/foreign-keys-clase-05.sql   SHOW CREATE TABLE para ver las FK
--
-- #####################################################################

-- =====================================================================
--  01 — Cardinalidad 1:N  ·  Autores y Libros
-- =====================================================================
--  Un autor escribe muchos libros. Un libro tiene UN autor.
--  Regla de la clase: la FK va SIEMPRE en el lado "muchos".
-- =====================================================================

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

DROP TABLE IF EXISTS Libros;
DROP TABLE IF EXISTS Autores;

CREATE TABLE Autores (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nombre   VARCHAR(100) NOT NULL
);

-- La FK va acá, en Libros, porque es el lado "muchos".
CREATE TABLE Libros (
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    titulo   VARCHAR(100) NOT NULL,
    anio     INT,
    id_autor INT,
    FOREIGN KEY (id_autor) REFERENCES Autores(id_autor)
);

INSERT INTO Autores (nombre) VALUES
    ('Jorge Luis Borges'),
    ('Julio Cortázar'),
    ('Silvina Ocampo');

INSERT INTO Libros (titulo, anio, id_autor) VALUES
    ('Ficciones',       1944, 1),
    ('El Aleph',        1949, 1),
    ('Rayuela',         1963, 2),
    ('Bestiario',       1951, 2),
    ('Autobiografia de Irene', 1948, 3);

-- Cada libro guarda a quien lo escribio:
SELECT l.titulo, l.anio, a.nombre AS autor
FROM Libros l
JOIN Autores a ON a.id_autor = l.id_autor
ORDER BY a.nombre, l.anio;

-- Cuantos libros tiene cada autor:
SELECT a.nombre, COUNT(l.id_libro) AS libros
FROM Autores a
LEFT JOIN Libros l ON l.id_autor = a.id_autor
GROUP BY a.id_autor, a.nombre;

-- ---------------------------------------------------------------------
--  Integridad referencial (Bloque 2.1 de la clase)
-- ---------------------------------------------------------------------

-- DEMO 1 — un libro de un autor que no existe
-- INSERT INTO Libros (titulo, anio, id_autor) VALUES ('Libro fantasma', 2024, 99);
-- ERROR 1452: Cannot add or update a child row: a foreign key constraint fails

-- DEMO 2 — borrar un autor que todavia tiene libros
-- DELETE FROM Autores WHERE id_autor = 1;
-- ERROR 1451: Cannot delete or update a parent row: a foreign key constraint fails
--
-- No es un bug: la base te protege de dejar libros huerfanos.
-- Primero resolves los libros (borrarlos o reasignarlos), despues el autor.

-- Silvina sin libros? Si le sacamos el suyo, si se puede borrar:
START TRANSACTION;
    DELETE FROM Libros  WHERE id_autor = 3;
    DELETE FROM Autores WHERE id_autor = 3;   -- ahora no da error
    SELECT nombre FROM Autores;
ROLLBACK;

SELECT nombre FROM Autores;   -- los tres otra vez

SHOW CREATE TABLE Libros;

-- =====================================================================
--  02 — Cardinalidad N:M  ·  Alumnos, Materias e Inscripciones
-- =====================================================================
--  Un alumno cursa muchas materias. Una materia tiene muchos alumnos.
--  Aca la FK directa NO alcanza: hace falta la tabla intermedia.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- =====================================================================
--  PARTE 1 · Lo que la clase dice que NO hay que hacer
--            materias = "Mate, Fisica, Quimica" en un solo campo
-- =====================================================================
DROP TABLE IF EXISTS Alumnos_mal;

CREATE TABLE Alumnos_mal (
    id_alumno INT PRIMARY KEY AUTO_INCREMENT,
    nombre    VARCHAR(100) NOT NULL,
    materias  VARCHAR(200)          -- varios valores en un solo campo
);

INSERT INTO Alumnos_mal (nombre, materias) VALUES
    ('Ana',  'Matematica, Fisica, Quimica'),
    ('Luis', 'Matematica, Historia'),
    ('Sofia','Fisica');

SELECT * FROM Alumnos_mal;

-- Se ve prolijo. Ahora proba hacer cualquier cosa util:

-- a) Cuantos alumnos cursan Fisica?
SELECT COUNT(*) AS 'cursan Fisica (?)'
FROM Alumnos_mal WHERE materias LIKE '%Fisica%';
--    Da 2 (Ana y Sofia) y parece funcionar. Funciona de casualidad.

-- Aparece un alumno de OTRA materia:
INSERT INTO Alumnos_mal (nombre, materias) VALUES ('Pedro', 'Fisica II, Algebra');

SELECT COUNT(*) AS 'cursan Fisica (?)'
FROM Alumnos_mal WHERE materias LIKE '%Fisica%';
--    Ahora da 3. Pedro NO cursa Fisica, cursa Fisica II.
--    El LIKE busca texto, no materias. La consulta no es confiable.

-- b) Cuantas materias cursa cada alumno? Hay que contar las comas:
SELECT nombre,
       LENGTH(materias) - LENGTH(REPLACE(materias, ',', '')) + 1 AS 'materias (?)'
FROM Alumnos_mal;
--    Es un parche, no una consulta.

-- c) Que nota se saco Ana en Fisica?  ->  imposible, no hay donde guardarla.
-- d) Renombrar "Matematica" en todo el sistema?  ->  UPDATE con REPLACE y rezar.

-- Esto viola la 1NF: un campo guarda UN SOLO valor.

-- =====================================================================
--  PARTE 2 · La forma correcta: tabla intermedia
-- =====================================================================
--      Alumnos  1 ──── N  Inscripciones  N ──── 1  Materias
--
--  Una N:M se parte en DOS relaciones 1:N contra la tabla del medio.
--  Y la tabla del medio guarda los datos PROPIOS del vinculo: la nota.
--  (La nota no es del alumno ni de la materia: es de la cursada.)
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
    nombre     VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Inscripciones (
    id_inscripcion INT PRIMARY KEY AUTO_INCREMENT,
    id_alumno      INT NOT NULL,
    id_materia     INT NOT NULL,
    nota           DECIMAL(4,2),          -- dato propio de la relacion
    FOREIGN KEY (id_alumno)  REFERENCES Alumnos(id_alumno),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia),
    -- un alumno no puede inscribirse dos veces a la misma materia:
    CONSTRAINT uq_inscripcion UNIQUE (id_alumno, id_materia)
);

INSERT INTO Alumnos (nombre, email) VALUES
    ('Ana',  'ana@mail.com'),
    ('Luis', 'luis@mail.com'),
    ('Sofia','sofia@mail.com');

INSERT INTO Materias (nombre) VALUES
    ('Matematica'), ('Fisica'), ('Quimica'), ('Historia');

INSERT INTO Inscripciones (id_alumno, id_materia, nota) VALUES
    (1, 1, 8.50),
    (1, 2, 7.00),
    (1, 3, NULL),    -- cursando, sin nota todavia
    (2, 1, 9.25),
    (2, 4, NULL),
    (3, 2, 6.00);

-- ---------------------------------------------------------------------
--  Las mismas preguntas de antes, ahora si
-- ---------------------------------------------------------------------

-- a) Cuantos alumnos cursan Fisica?  (exacto, sin LIKE)
SELECT m.nombre, COUNT(*) AS alumnos
FROM Inscripciones i
JOIN Materias m ON m.id_materia = i.id_materia
WHERE m.nombre = 'Fisica'
GROUP BY m.id_materia, m.nombre;

-- b) Cuantas materias cursa cada alumno?
SELECT a.nombre, COUNT(i.id_inscripcion) AS materias
FROM Alumnos a
LEFT JOIN Inscripciones i ON i.id_alumno = a.id_alumno
GROUP BY a.id_alumno, a.nombre
ORDER BY materias DESC;

-- c) Que nota se saco Ana en Fisica?
SELECT a.nombre, m.nombre AS materia, i.nota
FROM Inscripciones i
JOIN Alumnos  a ON a.id_alumno  = i.id_alumno
JOIN Materias m ON m.id_materia = i.id_materia
WHERE a.nombre = 'Ana' AND m.nombre = 'Fisica';

-- d) Renombrar la materia en todo el sistema: UNA fila.
UPDATE Materias SET nombre = 'Analisis Matematico' WHERE id_materia = 1;

SELECT a.nombre, m.nombre AS materia
FROM Inscripciones i
JOIN Alumnos  a ON a.id_alumno  = i.id_alumno
JOIN Materias m ON m.id_materia = i.id_materia
WHERE m.id_materia = 1;
-- Cambio para todos, porque el nombre vive en un solo lugar.

-- e) El promedio por alumno, que antes era imposible
SELECT a.nombre, ROUND(AVG(i.nota), 2) AS promedio
FROM Alumnos a
JOIN Inscripciones i ON i.id_alumno = a.id_alumno
WHERE i.nota IS NOT NULL
GROUP BY a.id_alumno, a.nombre;

-- ---------------------------------------------------------------------
--  Lo que protegen las restricciones
-- ---------------------------------------------------------------------

-- DEMO — inscribir a Ana dos veces a la misma materia
-- INSERT INTO Inscripciones (id_alumno, id_materia) VALUES (1, 2);
-- ERROR 1062: Duplicate entry '1-2' for key 'uq_inscripcion'

-- DEMO — inscribir a un alumno que no existe
-- INSERT INTO Inscripciones (id_alumno, id_materia) VALUES (99, 1);
-- ERROR 1452: Cannot add or update a child row: a foreign key constraint fails

SHOW CREATE TABLE Inscripciones;
