-- ============================================================
-- 01 - EL DATASET DE LA CLASE
-- Se puede correr las veces que haga falta: borra y recrea todo.
-- ============================================================

-- Los datos tienen acentos y enies. Esta linea le avisa al cliente que el
-- texto viene en UTF-8. Sin ella, segun con que programa importes, 'Gomez'
-- puede quedar guardado como 'G??mez'.
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS clase05;

CREATE DATABASE clase05
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE clase05;

-- ------------------------------------------------------------
-- Tabla alumno
-- ------------------------------------------------------------
CREATE TABLE alumno (
    id_alumno INT          PRIMARY KEY AUTO_INCREMENT,
    nombre    VARCHAR(50)  NOT NULL,
    apellido  VARCHAR(50)  NOT NULL,
    email     VARCHAR(100) UNIQUE,
    activo    BOOLEAN      DEFAULT TRUE
);

-- Ojo: tres alumnos quedan SIN email, a propósito.
-- Esos NULL son los que se usan en el archivo 03.
INSERT INTO alumno (nombre, apellido, email) VALUES
    ('Lucía',     'Gómez',     'lucia@mail.com'),
    ('Marcos',    'Pérez',     'marcos@mail.com'),
    ('Ana',       'Gómez',     'ana.gomez@mail.com'),
    ('Agustín',   'Ruiz',      'aruiz@otromail.com'),
    ('Valentina', 'Sosa',      'vsosa@mail.com'),
    ('Tomás',     'Ledesma',   NULL),
    ('Camila',    'Ríos',      NULL),
    ('Bruno',     'Gómez',     'bruno@mail.com'),
    ('Nicolás',   'Ferreyra',  NULL),
    ('Julieta',   'Acosta',    'julieta@mail.com');

-- ------------------------------------------------------------
-- Tabla producto
-- ------------------------------------------------------------
CREATE TABLE producto (
    id_producto     INT           PRIMARY KEY AUTO_INCREMENT,
    nombre          VARCHAR(80)   NOT NULL,
    precio          DECIMAL(10,2) NOT NULL,
    stock           INT           NOT NULL DEFAULT 0,
    categoria       VARCHAR(40),
    fecha_ingreso   DATE
);

-- Dos productos quedan sin categoría, también a propósito.
INSERT INTO producto (nombre, precio, stock, categoria, fecha_ingreso) VALUES
    ('Auriculares BT',   35000.00, 12, 'audio',      '2026-02-10'),
    ('Parlante chico',   28500.50,  7, 'audio',      '2026-02-14'),
    ('Monitor 24"',     185000.00,  3, 'video',      '2026-01-05'),
    ('Webcam HD',        42000.00,  0, 'video',      '2026-03-01'),
    ('Teclado mecánico', 89900.99,  9, 'periferico', '2026-03-12'),
    ('Mouse inalámbrico',21500.00, 25, 'periferico', '2026-03-12'),
    ('Cable HDMI',        4800.00, 50, 'cable',      '2026-01-20'),
    ('Adaptador USB-C',   7250.00, 31, 'cable',      NULL),
    ('Soporte de notebook', 96.50, 14, NULL,         '2026-02-28'),
    ('Pad de escritorio',  9999.00,  6, NULL,        '2026-03-20');

-- Control: 10 y 10
SELECT
    (SELECT COUNT(*) FROM alumno)   AS alumnos,
    (SELECT COUNT(*) FROM producto) AS productos;
