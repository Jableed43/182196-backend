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
CREATE TABLE esc_alumno (
    idalumno INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE
);

-- TODO: esc_materia     (idmateria, nombre UNIQUE, anio)
-- porque anio no usa año? si tenemos permitido usar ñ? el asunto es que se puede en el valor pero no en el nombre de la propiedad
CREATE TABLE esc_materia (
    idmateria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    anio INT NOT NULL
);

-- TODO: esc_inscripcion (idinscripcion, idalumno FK, idmateria FK,
--                        fecha, nota) + UNIQUE (idalumno, idmateria)
CREATE TABLE esc_inscripcion (
    idinscripcion INT PRIMARY KEY AUTO_INCREMENT,
    idalumno INT NOT NULL,
    idmateria INT NOT NULL,
    nota DECIMAL(4,2),
    FOREIGN KEY (idalumno) REFERENCES esc_alumno(idalumno),
    FOREIGN KEY (idmateria) REFERENCES esc_materia(idmateria),
    -- si queres evitar que un alumno se inscriba dos veces a la misma materia...
    CONSTRAINT uq_inscripcion UNIQUE (idalumno, idmateria)
);

-- 4 · Los datos
-- TODO: 3 alumnos, 3 materias y 4 inscripciones que los vinculen
INSERT INTO esc_alumno (nombre, email) VALUES
    ('Camila', 'camila@escuela.edu'),
    ('Tomas',  'tomas@escuela.edu'),
    ('Julia',  'julia@escuela.edu');

INSERT INTO esc_materia (nombre, anio) VALUES
    ('Matematica', 1),
    ('Lengua',     1),
    ('Historia',   2);

INSERT INTO esc_inscripcion (idalumno, idmateria, nota) VALUES
(1, 1, 8.00),
(1, 2, 9.50),
(2, 1, 6.75),
(3, 3, NULL);    -- todavia la está cursando

-- TODO: mostrá el modelo completo con JOINs: alumno, materia, nota

-- 5 · Cambiar la nota de una inscripción
-- TODO: SELECT primero, UPDATE después, SELECT para confirmar

-- 6 · Borrar una materia que tiene inscripciones
-- TODO: contá sus inscripciones y después intentá borrarla.
--       Anotá el error y explicá qué te está protegiendo.
-- TODO: ¿cuál es la secuencia correcta si de verdad querés eliminarla?
