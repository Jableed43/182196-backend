-- N:M — un alumno cursa muchas materias y una materia tiene muchos alumnos.

USE modelado;

-- =====================  PARTE 1 · La forma incorrecta  =====================
DROP TABLE IF EXISTS alumno_mal;

CREATE TABLE alumno_mal (
    idalumno INT PRIMARY KEY AUTO_INCREMENT,
    nombre   VARCHAR(100) NOT NULL,
    materias VARCHAR(200)
) ENGINE=InnoDB;

INSERT INTO alumno_mal (nombre, materias) VALUES
    ('Ana Pérez',  'Matemática, Física, Química'),
    ('Luis Gómez', 'Matemática, Historia'),
    ('Sofía Díaz', 'Física');

SELECT * FROM alumno_mal;

-- TODO: intentá responder estas tres con ESTA tabla:
--       a) ¿cuántos alumnos cursan Física?
--       b) ¿cuántas materias cursa cada alumno?
--       c) ¿qué nota se sacó Ana en Física?
--       Anotá cuál no se puede, y por qué las otras dos son frágiles.

-- =====================  PARTE 2 · La forma correcta  =====================
DROP TABLE IF EXISTS inscripcion;
DROP TABLE IF EXISTS alumno;
DROP TABLE IF EXISTS materia;

-- TODO: crear 'alumno' (idalumno, nombre, email UNIQUE)

-- TODO: crear 'materia' (idmateria, nombre UNIQUE)

-- TODO: crear 'inscripcion':
--       idinscripcion, idalumno, idmateria, fecha_inscripcion, nota
--       las DOS foreign keys
--       un UNIQUE (idalumno, idmateria)  -> no inscribirse dos veces
--       un CHECK para que la nota esté entre 0 y 10

-- TODO: insertar 3 alumnos, 4 materias y 6 inscripciones
--       (dejá al menos una con nota NULL: está cursando)

-- TODO: respondé ahora a), b) y c) con JOINs

-- TODO: renombrá una materia con UN solo UPDATE
--       y comprobá que cambió para todos los inscriptos

-- TODO: sacá el promedio de cada alumno (lo que antes era imposible)

-- Lo que protegen las restricciones. Descomentá de a uno:
-- INSERT INTO inscripcion (idalumno, idmateria, fecha_inscripcion) VALUES (1, 2, '2026-04-01');
-- INSERT INTO inscripcion (idalumno, idmateria, fecha_inscripcion) VALUES (99, 1, '2026-04-01');

SHOW CREATE TABLE inscripcion;
