-- #####################################################################
-- #
-- #   LIVE CODING 3 - Insertar, actualizar y borrar con seguridad
-- #
-- #####################################################################
--
--   Pasos de la slide:
--
--     1. Mira como se insertan los registros iniciales.
--     2. Ubica el UPDATE con JOIN que completa la clave foranea.
--     3. Corre el SELECT de verificacion ANTES de cada cambio.
--     4. Compara DELETE contra TRUNCATE.
--
--   Archivos de apoyo de la catedra (base `escuela`, no `modelado`):
--
--     CODIGO/backend/mysql/2/material-resuelto/veterinaria-RESUELTO.sql   INSERT inicial
--     CODIGO/backend/mysql/5/migracion-veterinaria/03-migrar-datos.sql    UPDATE con JOIN
--     CODIGO/backend/mysql/2/sql/02-demos-ddl.sql                         DELETE vs TRUNCATE
--
-- #####################################################################

-- =====================================================================
--  04 — INSERT, UPDATE y DELETE  ·  y cómo no borrar una tabla entera
-- =====================================================================

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- Pedidos_viejos tiene una FK contra Clientes (se crea mas abajo):
-- hay que soltarla ANTES de tocar Clientes, o el DROP falla con 1451.
DROP TABLE IF EXISTS Pedidos_viejos;


-- ---------------------------------------------------------------------
--  Punto de partida limpio (así este archivo se puede correr siempre)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Clientes;

CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(120) NOT NULL UNIQUE,
    telefono   VARCHAR(30)
);

CREATE TABLE Pedidos (
    id_pedido  INT PRIMARY KEY AUTO_INCREMENT,
    producto   VARCHAR(100) NOT NULL,
    precio     DECIMAL(10,2) NOT NULL,
    fecha      DATE NOT NULL,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

INSERT INTO Clientes (nombre, email, telefono) VALUES
    ('Ana',  'ana@mail.com',  '341-555-0001'),
    ('Luis', 'luis@mail.com', '341-555-0002'),
    ('Sofia','sofia@mail.com','341-555-0003');

INSERT INTO Pedidos (producto, precio, fecha, id_cliente) VALUES
    ('Teclado',   25000.00, '2026-03-01', 1),
    ('Mouse',     12000.00, '2026-03-03', 1),
    ('Monitor',  180000.00, '2026-03-05', 1),
    ('Notebook', 950000.00, '2026-03-06', 2);

-- =====================================================================
--  3.1 INSERT
-- =====================================================================

-- Varias filas en una sola sentencia (como en el apunte)
INSERT INTO Clientes (nombre, email) VALUES
    ('Marta', 'marta@mail.com'),
    ('Pedro', 'pedro@mail.com');

-- No pasamos id_cliente: es AUTO_INCREMENT, lo asigna la base.
SELECT * FROM Clientes;

-- LAST_INSERT_ID() devuelve el id que acaba de generarse.
-- Es lo que vas a usar desde Node cuando insertes un padre y sus hijos.
INSERT INTO Clientes (nombre, email) VALUES ('Nora', 'nora@mail.com');
SELECT LAST_INSERT_ID() AS 'id recien creado';

INSERT INTO Pedidos (producto, precio, fecha, id_cliente)
VALUES ('Auriculares', 45000.00, '2026-04-02', LAST_INSERT_ID());

-- DEMO — email repetido (lo impide el UNIQUE)
-- INSERT INTO Clientes (nombre, email) VALUES ('Otra Ana', 'ana@mail.com');
-- ERROR 1062: Duplicate entry 'ana@mail.com' for key 'email'

-- DEMO — un pedido de un cliente que no existe (lo impide la FK)
-- INSERT INTO Pedidos (producto, precio, fecha, id_cliente)
--        VALUES ('Tablet', 300000.00, '2026-04-03', 999);
-- ERROR 1452: Cannot add or update a child row: a foreign key constraint fails

-- =====================================================================
--  OJO DEMO ESPECIAL — el NOT NULL que NO protege (en XAMPP)
-- =====================================================================
--  Uno esperaría que omitir un campo NOT NULL dé error. Depende del sql_mode.

SELECT @@sql_mode AS 'modo actual';
--  En XAMPP sale algo como:
--    IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION
--  Fijate que NO está STRICT_TRANS_TABLES. Eso lo cambia todo.

START TRANSACTION;
INSERT INTO Clientes (nombre) VALUES ('Sin email');   -- (ojo) no da error
SHOW WARNINGS;
--  Warning 1364: Field 'email' doesn't have a default value
--  Un WARNING, no un error. La fila entró.

SELECT id_cliente, nombre, CONCAT('[', email, ']') AS email_guardado
FROM Clientes WHERE nombre = 'Sin email';
--  email_guardado = []   <- guardó un string VACÍO en un campo NOT NULL.
ROLLBACK;

SET SESSION sql_mode = 'STRICT_TRANS_TABLES';
-- Con el modo estricto, el mismo INSERT ahora SÍ es ERROR 1364.
SET SESSION sql_mode = DEFAULT;

-- CLAVE: Moraleja, que vale para toda la cursada:
--    "la base lo valida" depende de CÓMO esté configurada la base.
--    El mismo INSERT pasa en tu XAMPP y explota en producción.
--    Por eso las validaciones también van en el código (express-validator).

-- =====================================================================
--  3.2 UPDATE
-- =====================================================================
--  * LA COSTUMBRE QUE SALVA CARRERAS:
--     escribí el WHERE ANTES que el SET, y probalo con un SELECT primero.
-- =====================================================================

-- Paso 1 — ver exactamente a quién voy a tocar
SELECT * FROM Clientes WHERE id_cliente = 1;

-- Paso 2 — recién ahora, el UPDATE con el MISMO where
UPDATE Clientes
SET email = 'ana.nueva@mail.com'
WHERE id_cliente = 1;

-- Paso 3 — confirmar
SELECT * FROM Clientes WHERE id_cliente = 1;

-- El SET puede usar el valor anterior de la propia columna:
SELECT id_pedido, producto, precio FROM Pedidos WHERE producto = 'Teclado';
UPDATE Pedidos SET precio = precio * 1.10 WHERE producto = 'Teclado';
SELECT id_pedido, producto, precio FROM Pedidos WHERE producto = 'Teclado';

-- =====================================================================
--  !!! ERROR CATASTRÓFICO #1 — EL UPDATE SIN WHERE
-- =====================================================================
--  Lo hacemos de verdad, pero dentro de una TRANSACCIÓN para deshacerlo.
--  Así se ve el desastre sin pagarlo.
-- =====================================================================

SELECT id_cliente, nombre, telefono FROM Clientes;   -- antes

START TRANSACTION;

UPDATE Clientes SET telefono = '000-000';        -- !!! sin WHERE
SELECT ROW_COUNT() AS 'filas afectadas';         -- <-- va PEGADO al UPDATE

SELECT id_cliente, nombre, telefono FROM Clientes;  -- durante: TODOS iguales

ROLLBACK;

SELECT id_cliente, nombre, telefono FROM Clientes;  -- después: intacto

-- TIP: Dato que vale señalar: si lo hubiéramos hecho con 'email' en vez de
--    'telefono', el UNIQUE lo habría rechazado (ERROR 1062). O sea que una
--    restricción bien puesta puede frenar hasta un error catastrófico.
--    Pero es suerte, no estrategia: 'telefono' no tiene UNIQUE.

-- OJO El ROLLBACK solo funciona porque abrimos la transacción a propósito.
--    En una consola normal, con autocommit, ese UPDATE es DEFINITIVO.
--    No hay Ctrl+Z.

-- =====================================================================
--  3.3 DELETE
-- =====================================================================

-- Igual que el UPDATE: primero mirar, después borrar.
SELECT * FROM Pedidos WHERE id_pedido = 1;
DELETE FROM Pedidos WHERE id_pedido = 1;

-- ---------------------------------------------------------------------
--  La integridad referencial también actúa en el DELETE
-- ---------------------------------------------------------------------
-- Ana (id_cliente 1) tiene pedidos. Intentar borrarla:
-- DELETE FROM Clientes WHERE id_cliente = 1;
-- ERROR 1451: Cannot delete or update a parent row: a foreign key
--             constraint fails
--
-- Para borrarla hay que decidir qué pasa con sus pedidos:
--   1) borrarlos primero, 2) reasignarlos, o
--   3) declarar la FK con ON DELETE CASCADE y que se vayan con ella.
-- La opción 3 está en el material de FOREIGN KEY de la cátedra
-- (mysql/5/sql/foreign-keys-clase-05.sql). Ojo: CASCADE borra en silencio.

-- Pedro no tiene pedidos, así que sí se puede:
DELETE FROM Clientes WHERE nombre = 'Pedro';
SELECT id_cliente, nombre FROM Clientes;

-- =====================================================================
--  !!! ERROR CATASTRÓFICO #2 — EL DELETE SIN WHERE
-- =====================================================================

SELECT COUNT(*) AS 'pedidos antes' FROM Pedidos;

START TRANSACTION;
DELETE FROM Pedidos;                              -- !!! vacía la tabla
SELECT COUNT(*) AS 'pedidos durante' FROM Pedidos;
ROLLBACK;

SELECT COUNT(*) AS 'pedidos despues' FROM Pedidos;

-- ---------------------------------------------------------------------
--  DELETE vs TRUNCATE
-- ---------------------------------------------------------------------
--  DELETE FROM t     -> borra fila por fila · se puede ROLLBACK · respeta FK
--                    · NO reinicia el AUTO_INCREMENT
--  TRUNCATE TABLE t -> vacía de golpe · NO se puede deshacer (es DDL)
--                    · reinicia el AUTO_INCREMENT
--                    · falla si otra tabla la referencia con FK
--
--  Por eso TRUNCATE es más rápido y más peligroso.

-- =====================================================================
--  * REGLA DE ORO
--    1. WHERE primero, SET después.
--    2. SELECT con el mismo WHERE antes de ejecutar.
--    3. Si la operación es grande o dudosa: START TRANSACTION.
--    4. Las FK no son un obstáculo: evitan datos huérfanos.
-- =====================================================================


-- #####################################################################
-- #
-- #   PASO 2 DE LA SLIDE - UPDATE con JOIN para completar la FK
-- #
-- #   Es lo que hace 03-migrar-datos.sql: una tabla vieja guarda el
-- #   nombre del cliente como texto, y hay que convertirlo en un id.
-- #
-- #####################################################################

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

DROP TABLE IF EXISTS Pedidos_viejos;

CREATE TABLE Pedidos_viejos (
    id_pedido      INT PRIMARY KEY AUTO_INCREMENT,
    producto       VARCHAR(100) NOT NULL,
    nombre_cliente VARCHAR(100) NOT NULL,   -- el nombre, como texto
    id_cliente     INT NULL                 -- vacia: la vamos a completar
);

INSERT INTO Pedidos_viejos (producto, nombre_cliente) VALUES
    ('Teclado',  'Ana'),
    ('Mouse',    'Ana'),
    ('Notebook', 'Luis'),
    ('Webcam',   'Sofia');

SELECT * FROM Pedidos_viejos;
--  id_cliente esta todo en NULL. Asi llega una base vieja.

-- Paso 1 - SIEMPRE mirar primero a quien vamos a tocar
SELECT p.id_pedido, p.nombre_cliente, c.id_cliente
FROM Pedidos_viejos p
JOIN Clientes c ON c.nombre = p.nombre_cliente;

-- Paso 2 - el UPDATE con JOIN: el SET usa datos de la OTRA tabla
UPDATE Pedidos_viejos p
JOIN Clientes c ON c.nombre = p.nombre_cliente
SET p.id_cliente = c.id_cliente;

SELECT ROW_COUNT() AS 'filas migradas';

-- Paso 3 - confirmar
SELECT * FROM Pedidos_viejos;

-- Quedo alguno sin migrar? (un nombre que no existe en Clientes)
SELECT id_pedido, producto, nombre_cliente
FROM Pedidos_viejos
WHERE id_cliente IS NULL;
--  Esos son los que hay que revisar a mano ANTES de declarar la FK.
--  Si declaras la FK con filas huerfanas, falla con ERROR 1452.

-- Recien con la columna completa se puede declarar la FK:
ALTER TABLE Pedidos_viejos
    ADD CONSTRAINT fk_pedidosviejos_cliente
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente);

SHOW CREATE TABLE Pedidos_viejos;


-- #####################################################################
-- #
-- #   PASO 4 DE LA SLIDE - DELETE contra TRUNCATE, en vivo
-- #
-- #####################################################################

DROP TABLE IF EXISTS prueba_borrado;

CREATE TABLE prueba_borrado (
    id     INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

INSERT INTO prueba_borrado (nombre) VALUES ('uno'), ('dos'), ('tres');
SELECT * FROM prueba_borrado;

-- --- DELETE ---
DELETE FROM prueba_borrado;
INSERT INTO prueba_borrado (nombre) VALUES ('despues del DELETE');
SELECT * FROM prueba_borrado;
--  El id arranca en 4: el AUTO_INCREMENT NO se reinicia.

-- --- TRUNCATE ---
TRUNCATE TABLE prueba_borrado;
INSERT INTO prueba_borrado (nombre) VALUES ('despues del TRUNCATE');
SELECT * FROM prueba_borrado;
--  El id arranca en 1: TRUNCATE SI reinicia el contador.

-- Y la diferencia que mas importa:
--   DELETE   se puede deshacer con ROLLBACK dentro de una transaccion.
--   TRUNCATE no. Es DDL, hace COMMIT implicito. No hay vuelta atras.
--   TRUNCATE ademas falla si otra tabla la referencia con una FK.
