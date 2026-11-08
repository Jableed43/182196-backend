-- =====================================================================
--  BASE `escuela` — dataset canónico del curso
-- =====================================================================
--
--  Es la base que se usa de la Etapa 5 en adelante. Trae la estructura
--  completa y los datos cargados.
--
--  Origen: adaptada de `tema-08-mysql-scripts-sql/escuela-completa.sql`
--  (dump de cursadas anteriores). Se reescribió entera:
--    · nombres de tabla en SINGULAR   (docente, estudiante, materia, inscripcion)
--    · nombres de columna en snake_case
--    · sin la basura del dump (/*!40101 ... */, LOCK TABLES, etc.)
--    · con las restricciones que se ven en la Etapa 4
--
--  Se puede ejecutar las veces que haga falta: borra y recrea todo.
--
--  ⚠️ IMPORTANTE: esto reemplaza la `escuela` que armaste a mano en las
--     Etapas 3 y 4. Es el mismo esquema, ahora con datos.
--
--  NOTA: Las FOREIGN KEY y la tabla `inscripcion` se explican en las
--     Etapas 7 y 8. Por ahora ejecutalo y no te preocupes por esas líneas.
-- =====================================================================


CREATE DATABASE IF NOT EXISTS escuela
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE escuela;


-- ---------------------------------------------------------------------
--  Limpieza
-- ---------------------------------------------------------------------
--  Se borra en orden inverso al de creación: primero las tablas que
--  apuntan a otras, después las apuntadas.

DROP TABLE IF EXISTS inscripcion;
DROP TABLE IF EXISTS materia;
DROP TABLE IF EXISTS estudiante;
DROP TABLE IF EXISTS docente;


-- ---------------------------------------------------------------------
--  1. docente
-- ---------------------------------------------------------------------

CREATE TABLE docente (
    iddocente     INT          PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(50)  NOT NULL,
    apellido      VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    especialidad  VARCHAR(100),
    fecha_ingreso DATE,
    estado        ENUM('activo', 'licencia', 'baja') DEFAULT 'activo'
) ENGINE=InnoDB;

INSERT INTO docente (iddocente, nombre, apellido, email, especialidad, fecha_ingreso) VALUES
    ( 1, 'Carlos',  'García',    'carlos.garcia@universidad.edu',    'Programación',            '2020-01-15'),
    ( 2, 'María',   'López',     'maria.lopez@universidad.edu',      'Base de Datos',           '2019-03-20'),
    ( 3, 'Juan',    'Martínez',  'juan.martinez@universidad.edu',    'Algoritmos',              '2021-02-10'),
    ( 4, 'Ana',     'Rodríguez', 'ana.rodriguez@universidad.edu',    'Matemática',              '2018-09-01'),
    ( 5, 'Pedro',   'Fernández', 'pedro.fernandez@universidad.edu',  'Redes',                   '2020-06-15'),
    ( 6, 'Laura',   'Sánchez',   'laura.sanchez@universidad.edu',    'Seguridad',               '2021-08-20'),
    ( 7, 'Roberto', 'González',  'roberto.gonzalez@universidad.edu', 'Inteligencia Artificial', '2022-01-10'),
    ( 8, 'Sofía',   'Pérez',     'sofia.perez@universidad.edu',      'Desarrollo Web',          '2019-11-05'),
    ( 9, 'Diego',   'Torres',    'diego.torres@universidad.edu',     'Ingeniería de Software',  '2020-04-12'),
    (10, 'Carmen',  'Ruiz',      'carmen.ruiz@universidad.edu',      'Idiomas',                 '2018-02-28');


-- ---------------------------------------------------------------------
--  2. estudiante
-- ---------------------------------------------------------------------
--  `creado_en` no se carga: lo completa la base sola (DEFAULT).

CREATE TABLE estudiante (
    idestudiante     INT          PRIMARY KEY AUTO_INCREMENT,
    nombre           VARCHAR(50)  NOT NULL,
    apellido         VARCHAR(50)  NOT NULL,
    email            VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento DATE         NOT NULL,
    telefono         VARCHAR(20),
    creado_en        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO estudiante (idestudiante, nombre, apellido, email, fecha_nacimiento) VALUES
    ( 1, 'Javier',    'Lopez',     'jlopez@gmail.com',              '1992-09-10'),
    ( 2, 'Matias',    'Riera',     'matr@gmail.com',                '1991-06-24'),
    ( 3, 'Theo',      'Saravia',   'theosaravia@gmail.com',         '2005-06-13'),
    ( 4, 'Angel',     'Raddino',   'angelRaddino@gmail.com',        '2005-08-15'),
    ( 5, 'Sofia',     'Martinez',  'sofia.martinez@email.com',      '2000-03-15'),
    ( 6, 'Lucas',     'Garcia',    'lucas.garcia@email.com',        '1999-07-22'),
    ( 7, 'Valentina', 'Rodriguez', 'valentina.rodriguez@email.com', '2001-11-08'),
    ( 8, 'Mateo',     'Fernandez', 'mateo.fernandez@email.com',     '2002-01-30'),
    ( 9, 'Isabella',  'Lopez',     'isabella.lopez@email.com',      '2000-05-18'),
    (10, 'Santiago',  'Gonzalez',  'santiago.gonzalez@email.com',   '1998-09-12'),
    (11, 'Camila',    'Perez',     'camila.perez@email.com',        '2001-12-25'),
    (12, 'Nicolas',   'Sanchez',   'nicolas.sanchez@email.com',     '1999-04-07'),
    (13, 'Martina',   'Torres',    'martina.torres@email.com',      '2002-08-14'),
    (14, 'Sebastian', 'Ramirez',   'sebastian.ramirez@email.com',   '2000-02-28'),
    (15, 'Lucia',     'Flores',    'lucia.flores@email.com',        '2001-10-05'),
    (16, 'Diego',     'Morales',   'diego.morales@email.com',       '1999-06-20'),
    (17, 'Emma',      'Rivera',    'emma.rivera@email.com',         '2002-03-11'),
    (18, 'Benjamin',  'Ortiz',     'benjamin.ortiz@email.com',      '2000-07-09'),
    (19, 'Olivia',    'Vargas',    'olivia.vargas@email.com',       '2001-09-16'),
    (20, 'Maximo',    'Castro',    'maximo.castro@email.com',       '1998-11-23'),
    (21, 'Amelia',    'Reyes',     'amelia.reyes@email.com',        '2002-01-04'),
    (22, 'Tomas',     'Jimenez',   'tomas.jimenez@email.com',       '1999-08-17'),
    (23, 'Mia',       'Herrera',   'mia.herrera@email.com',         '2001-05-29'),
    (24, 'Agustin',   'Ruiz',      'agustin.ruiz@email.com',        '2000-12-13'),
    (25, 'Catalina',  'Diaz',      'catalina.diaz@email.com',       '2002-04-26'),
    (26, 'Joaquin',   'Moreno',    'joaquin.moreno@email.com',      '1999-10-02'),
    (27, 'Victoria',  'Alvarez',   'victoria.alvarez@email.com',    '2001-07-19'),
    (28, 'Ignacio',   'Gutierrez', 'ignacio.gutierrez@email.com',   '2000-03-31'),
    (29, 'Antonella', 'Silva',     'antonella.silva@email.com',     '2002-06-08'),
    (30, 'Facundo',   'Romero',    'facundo.romero@email.com',      '1998-09-21');


-- ---------------------------------------------------------------------
--  3. materia
-- ---------------------------------------------------------------------
--  `docente_id` apunta al docente que la dicta. Puede quedar en NULL:
--  hay materias sin docente asignado.
--  ON DELETE SET NULL -> si se borra el docente, la materia queda sin él
--  (pero la materia NO se borra).

CREATE TABLE materia (
    idmateria  INT          PRIMARY KEY AUTO_INCREMENT,
    nombre     VARCHAR(100) NOT NULL,
    codigo     VARCHAR(20)  UNIQUE,
    creditos   INT          DEFAULT 4,
    docente_id INT,
    CONSTRAINT chk_materia_creditos CHECK (creditos > 0 AND creditos <= 20),
    CONSTRAINT fk_materia_docente
        FOREIGN KEY (docente_id) REFERENCES docente(iddocente)
        ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO materia (idmateria, nombre, codigo, docente_id) VALUES
    ( 1, 'Programación I',               'PROG1',  1),
    ( 2, 'Base de Datos',                'BD1',    2),
    ( 3, 'Matemática',                   'MAT1',   4),
    ( 4, 'Inglés',                       'ING1',  10),
    ( 5, 'Programación II',              'PROG2',  1),
    ( 6, 'Estructuras de Datos',         'ED1',    3),
    ( 7, 'Algoritmos',                   'ALG1',   3),
    ( 8, 'Sistemas Operativos',          'SO1',    5),
    ( 9, 'Redes de Computadoras',        'RED1',   5),
    (10, 'Arquitectura de Computadoras', 'ARQ1',   2),
    (11, 'Ingeniería de Software',       'IS1',    9),
    (12, 'Bases de Datos Avanzadas',     'BD2',    2),
    (13, 'Programación Web',             'PW1',    8),
    (14, 'Desarrollo Mobile',            'DM1',    3),
    (15, 'Inteligencia Artificial',      'IA1',    7),
    (16, 'Seguridad Informática',        'SI1',    6),
    (17, 'Cálculo I',                    'CAL1',   3),
    (18, 'Cálculo II',                   'CAL2',   1),
    (19, 'Álgebra Lineal',               'AL1',    2),
    (20, 'Estadística',                  'EST1',   3),
    (21, 'Física I',                     'FIS1',   1),
    (22, 'Física II',                    'FIS2',   2),
    (23, 'Inglés Técnico',               'ING2',  10),
    (24, 'Comunicación',                 'COM1',  10),
    (25, 'Ética Profesional',            'ETI1',   2),
    (26, 'Proyecto Integrador I',        'PI1',    3),
    (27, 'Proyecto Integrador II',       'PI2',    1),
    (28, 'Prácticas Profesionales',      'PP1',    2),
    (29, 'Seminario de Tesis',           'ST1',    3),
    (30, 'Emprendimiento Tecnológico',   'ET1',    1);


-- ---------------------------------------------------------------------
--  4. inscripcion
-- ---------------------------------------------------------------------
--  Es la tabla que conecta estudiantes con materias (relación N:M).
--  `nota` puede ser NULL: la materia está cursando y todavía no tiene nota.
--  ON DELETE CASCADE -> si se borra el estudiante, se borran sus inscripciones.

CREATE TABLE inscripcion (
    idinscripcion     INT  PRIMARY KEY AUTO_INCREMENT,
    idestudiante      INT  NOT NULL,
    idmateria         INT  NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    nota              DECIMAL(4,2),
    CONSTRAINT chk_inscripcion_nota CHECK (nota >= 0 AND nota <= 10),
    CONSTRAINT fk_inscripcion_estudiante
        FOREIGN KEY (idestudiante) REFERENCES estudiante(idestudiante)
        ON DELETE CASCADE,
    CONSTRAINT fk_inscripcion_materia
        FOREIGN KEY (idmateria) REFERENCES materia(idmateria)
) ENGINE=InnoDB;

INSERT INTO inscripcion (idinscripcion, idestudiante, idmateria, fecha_inscripcion, nota) VALUES
    ( 1,  1,  1, '2025-01-10', 8.50),
    ( 2,  1,  2, '2025-01-10', 7.00),
    ( 3,  1,  5, '2025-01-15', 9.00),
    ( 4,  2,  1, '2025-01-11', 9.00),
    ( 5,  2,  3, '2025-01-11', 8.00),
    ( 6,  2,  6, '2025-01-12', 7.50),
    ( 7,  2, 11, '2025-01-20', NULL),
    ( 8,  3,  2, '2025-01-12', NULL),
    ( 9,  3,  4, '2025-01-12', 6.50),
    (10,  4,  1, '2025-01-13', 8.00),
    (11,  4,  7, '2025-01-13', 7.50),
    (12,  4, 12, '2025-01-14', 9.50),
    (13,  5,  1, '2025-01-14', 9.50),
    (14,  5,  2, '2025-01-14', 8.50),
    (15,  5,  5, '2025-01-15', 9.00),
    (16,  5, 13, '2025-01-16', 8.00),
    (17,  5, 14, '2025-01-17', NULL),
    (18,  6,  3, '2025-01-15', 7.00),
    (19,  6, 17, '2025-01-15', 6.00),
    (20,  7,  1, '2025-01-16', 8.50),
    (21,  7,  6, '2025-01-16', 7.50),
    (22,  7,  7, '2025-01-17', 8.00),
    (23,  7, 15, '2025-01-18', 9.00),
    (24,  8,  2, '2025-01-17', 7.50),
    (25,  8,  8, '2025-01-17', 6.50),
    (26,  8,  9, '2025-01-18', NULL),
    (27,  9,  1, '2025-01-18', 9.00),
    (28,  9,  5, '2025-01-18', 8.50),
    (29,  9, 13, '2025-01-19', 9.50),
    (30,  9, 14, '2025-01-20', 8.00),
    (31, 10,  3, '2025-01-19', 8.00),
    (32, 10, 18, '2025-01-19', 7.00),
    (33, 11,  1, '2025-01-20', 7.50),
    (34, 11,  2, '2025-01-20', 8.00),
    (35, 11, 11, '2025-01-21', 7.00),
    (36, 12,  6, '2025-01-21', 8.50),
    (37, 12,  7, '2025-01-21', 9.00),
    (38, 12, 10, '2025-01-22', 7.50),
    (39, 12, 16, '2025-01-22', 8.00),
    (40, 13,  4, '2025-01-22', 9.00),
    (41, 13, 23, '2025-01-22', 8.50),
    (42, 14,  1, '2025-01-23', 8.00),
    (43, 14,  5, '2025-01-23', 7.50),
    (44, 14, 13, '2025-01-24', 8.50),
    (45, 14, 15, '2025-01-24', 9.00),
    (46, 14, 26, '2025-01-25', NULL),
    (47, 15,  2, '2025-01-24', 9.50),
    (48, 15, 12, '2025-01-24', 8.50),
    (49, 15, 16, '2025-01-25', 7.50),
    (50, 21,  1, '2025-01-28', 8.00),
    (51, 22,  2, '2025-01-28', 7.00),
    (52, 23,  1, '2025-01-29', 9.50),
    (53, 24,  4, '2025-01-29', 8.00),
    (54, 26,  2, '2025-01-30', 8.00),
    (55, 27,  1, '2025-02-01', 8.50),
    (56, 29, 19, '2025-02-02', 9.00);


-- ---------------------------------------------------------------------
--  Verificación
-- ---------------------------------------------------------------------

SHOW TABLES;

SELECT 'docente'     AS tabla, COUNT(*) AS filas FROM docente
UNION ALL
SELECT 'estudiante',  COUNT(*) FROM estudiante
UNION ALL
SELECT 'materia',     COUNT(*) FROM materia
UNION ALL
SELECT 'inscripcion', COUNT(*) FROM inscripcion;

-- OJO Esperado:  docente 10 · estudiante 30 · materia 30 · inscripcion 56


-- =====================================================================
--  CARACTERÍSTICAS ÚTILES DE ESTE DATASET (para armar ejercicios)
--
--  · Hay estudiantes SIN inscripciones (16 a 20, 25, 28, 30)
--       -> se nota la diferencia entre INNER JOIN y LEFT JOIN
--  · Hay materias SIN inscriptos (20, 21, 22, 24, 25, 27, 28, 29, 30)
--       -> se nota la diferencia entre INNER JOIN y RIGHT JOIN
--  · Hay inscripciones con `nota` en NULL (cursando, sin nota todavía)
--       -> sirve para IS NULL y para ver cómo se comporta AVG con NULL
--  · Hay docentes con muchas materias y con pocas
--       -> sirve para GROUP BY / HAVING
--  · Las fechas de nacimiento van de 1991 a 2005
--       -> sirve para BETWEEN y funciones de fecha
-- =====================================================================
