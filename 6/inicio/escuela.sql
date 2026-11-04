-- EJERCICIO DE CLASE: el modelo de una escuela.

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- 1 y 2 · El modelo y su cardinalidad
-- TODO: dibujá el modelo (podés hacerlo con comentarios acá mismo)
-- TODO: ¿qué cardinalidad hay entre alumno y materia?
-- TODO: ¿por qué hace falta una tabla intermedia? Escribí la justificación.

-- 3 · Las tres tablas con sus PK y FK
DROP TABLE IF EXISTS Inscripciones;
DROP TABLE IF EXISTS Alumnos;
DROP TABLE IF EXISTS Materias;

-- TODO: Alumnos      (id_alumno, nombre, email UNIQUE)
CREATE TABLE Alumnos (
    id_alumno INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE
);

-- TODO: Materias     (id_materia, nombre UNIQUE, anio)
-- porque anio no usa año? si tenemos permitido usar ñ? el asunto es que se puede en el valor pero no en el nombre de la propiedad
CREATE TABLE Materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    anio INT NOT NULL
);

-- TODO: Inscripciones (id_inscripcion, id_alumno FK, id_materia FK,
--                        fecha, nota) + UNIQUE (id_alumno, id_materia)
CREATE TABLE Inscripciones (
    id_inscripcion INT PRIMARY KEY AUTO_INCREMENT,
    id_alumno INT NOT NULL,
    id_materia INT NOT NULL,
    nota DECIMAL(4,2),
    FOREIGN KEY (id_alumno) REFERENCES Alumnos(id_alumno),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia),
    -- si queres evitar que un alumno se inscriba dos veces a la misma materia...
    CONSTRAINT uq_inscripcion UNIQUE (id_alumno, id_materia)
);

-- 4 · Los datos
-- TODO: 3 alumnos, 3 materias y 4 inscripciones que los vinculen
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
(3, 3, NULL);    -- todavia la está cursando

-- TODO: mostrá el modelo completo con JOINs: alumno, materia, nota

-- 5 · Cambiar la nota de una inscripción
-- TODO: SELECT primero, UPDATE después, SELECT para confirmar

-- 6 · Borrar una materia que tiene inscripciones
-- TODO: contá sus inscripciones y después intentá borrarla.
--       Anotá el error y explicá qué te está protegiendo.
-- TODO: ¿cuál es la secuencia correcta si de verdad querés eliminarla?
