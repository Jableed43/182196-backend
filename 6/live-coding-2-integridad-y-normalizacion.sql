-- #####################################################################
-- #
-- #   LIVE CODING 2 - Declarar una FK y verla proteger los datos
-- #
-- #####################################################################
--
--   Pasos de la slide:
--
--     1. Lee la seccion de RESTRICT: intenta borrar un registro con hijos.
--     2. Segui con ON DELETE CASCADE y SET NULL, compara que les pasa a los hijos.
--     3. Corre 04-lo-que-no-se-puede.sql y pedi la consulta que recupere el dato: no existe.
--     4. Ejecuta 05-declarar-fk.sql y 06-probar-proteccion.sql.
--     5. Aca abajo: normalizar es que cada dato viva en un solo lugar.
--
--   Archivos de apoyo de la catedra (base `escuela`, no `modelado`):
--
--     CODIGO/backend/mysql/5/sql/foreign-keys-clase-05.sql                RESTRICT, CASCADE, SET NULL
--     CODIGO/backend/mysql/5/migracion-veterinaria/04-lo-que-no-se-puede.sql
--     CODIGO/backend/mysql/5/migracion-veterinaria/05-declarar-fk.sql
--     CODIGO/backend/mysql/5/migracion-veterinaria/06-probar-proteccion.sql
--
-- #####################################################################

-- =====================================================================
--  03 — Normalizacion  ·  la tabla de Pedidos de la clase
-- =====================================================================
--  Normalizar = que cada dato viva en UN SOLO lugar.
--  Vamos a provocar la anomalia de actualizacion de verdad.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- Pedidos_viejos tiene una FK contra Clientes (se crea mas abajo):
-- hay que soltarla ANTES de tocar Clientes, o el DROP falla con 1451.
DROP TABLE IF EXISTS Pedidos_viejos;


-- =====================================================================
--  PARTE 1 · La tabla sin normalizar (la del apunte)
-- =====================================================================
DROP TABLE IF EXISTS Pedidos_plano;

CREATE TABLE Pedidos_plano (
    id_pedido     INT PRIMARY KEY AUTO_INCREMENT,
    cliente       VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(120) NOT NULL,   -- se repite en cada pedido
    producto      VARCHAR(100) NOT NULL,
    fecha         DATE NOT NULL
);

INSERT INTO Pedidos_plano (cliente, email_cliente, producto, fecha) VALUES
    ('Ana',  'ana@mail.com',  'Teclado',  '2026-03-01'),
    ('Ana',  'ana@mail.com',  'Mouse',    '2026-03-03'),
    ('Ana',  'ana@mail.com',  'Monitor',  '2026-03-05'),
    ('Ana',  'ana@mail.com',  'Webcam',   '2026-03-10'),
    ('Luis', 'luis@mail.com', 'Notebook', '2026-03-06');

SELECT * FROM Pedidos_plano;
-- El email de Ana esta escrito 4 veces. Eso es la redundancia.

-- ---------------------------------------------------------------------
--  LA ANOMALIA DE ACTUALIZACION, en vivo
-- ---------------------------------------------------------------------
--  Ana cambia de email. Hay que actualizar MUCHAS filas.
--  Y si te olvidas una... (aca el WHERE se queda corto a proposito)

UPDATE Pedidos_plano
SET email_cliente = 'ana.nueva@mail.com'
WHERE cliente = 'Ana' AND fecha < '2026-03-07';

SELECT email_cliente, COUNT(*) AS pedidos
FROM Pedidos_plano
WHERE cliente = 'Ana'
GROUP BY email_cliente;

--  Resultado: DOS emails distintos para la MISMA persona.
--  La base no dio ningun error. Los datos quedaron inconsistentes.
--  Esa es la anomalia de actualizacion.

-- Otras dos anomalias de la misma tabla:
--   · de insercion: no podes dar de alta un cliente que todavia
--     no hizo ningun pedido. No hay donde ponerlo.
--   · de borrado: si borras el unico pedido de Luis, perdes su email
--     para siempre. El dato del cliente se va con el pedido.

-- =====================================================================
--  PARTE 2 · Normalizado: separar en dos tablas y vincular con FK
-- =====================================================================
--  El email depende del CLIENTE, no del pedido  ->  va en Clientes (3NF)
-- =====================================================================

DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Clientes;

CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE Pedidos (
    id_pedido  INT PRIMARY KEY AUTO_INCREMENT,
    producto   VARCHAR(100) NOT NULL,
    fecha      DATE NOT NULL,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

INSERT INTO Clientes (nombre, email) VALUES
    ('Ana',  'ana@mail.com'),
    ('Luis', 'luis@mail.com');

INSERT INTO Pedidos (producto, fecha, id_cliente) VALUES
    ('Teclado',  '2026-03-01', 1),
    ('Mouse',    '2026-03-03', 1),
    ('Monitor',  '2026-03-05', 1),
    ('Webcam',   '2026-03-10', 1),
    ('Notebook', '2026-03-06', 2);

-- El email de Ana esta UNA sola vez:
SELECT * FROM Clientes;

-- Y el pedido solo guarda el id_cliente que lo referencia:
SELECT * FROM Pedidos;

-- La vista completa se arma con un JOIN:
SELECT p.id_pedido, c.nombre, c.email, p.producto, p.fecha
FROM Pedidos p
JOIN Clientes c ON c.id_cliente = p.id_cliente
ORDER BY p.id_pedido;

-- ---------------------------------------------------------------------
--  Ahora el cambio de email es UNA fila, y es imposible equivocarse
-- ---------------------------------------------------------------------
UPDATE Clientes
SET email = 'ana.nueva@mail.com'
WHERE id_cliente = 1;

SELECT p.id_pedido, c.nombre, c.email, p.producto
FROM Pedidos p
JOIN Clientes c ON c.id_cliente = p.id_cliente
WHERE c.id_cliente = 1;
-- Los 4 pedidos de Ana muestran el email nuevo. Un solo UPDATE.

-- Y las otras dos anomalias tambien desaparecen:
INSERT INTO Clientes (nombre, email) VALUES ('Sofia', 'sofia@mail.com');
SELECT * FROM Clientes;   -- cliente sin pedidos: ahora si se puede

-- =====================================================================
--  Las formas normales, en version practica
--
--    1NF — cada campo guarda UN SOLO valor
--          (el "Mate, Fisica" del archivo 02 la rompia)
--    2NF — cada campo depende de TODA la PK (importa con claves compuestas)
--    3NF — ningun campo depende de otro que no sea la PK
--          (el email depende del cliente, no del pedido -> va en Clientes)
--
--  Regla practica: si ves el mismo dato repetido en muchas filas,
--  probablemente deberia estar en su propia tabla, referenciada por FK.
-- =====================================================================


-- #####################################################################
-- #
-- #   PASOS 1 y 2 DE LA SLIDE - RESTRICT vs CASCADE vs SET NULL
-- #
-- #   Lo mismo que foreign-keys-clase-05.sql, pero sobre `modelado`
-- #   para no tener que cambiar de base en el medio de la clase.
-- #
-- #####################################################################

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

DROP TABLE IF EXISTS hijo_restrict;
DROP TABLE IF EXISTS hijo_cascade;
DROP TABLE IF EXISTS hijo_setnull;
DROP TABLE IF EXISTS padre;

CREATE TABLE padre (
    id_padre INT PRIMARY KEY AUTO_INCREMENT,
    nombre   VARCHAR(50) NOT NULL
);

-- El comportamiento por defecto. Si no escribis nada, es este.
CREATE TABLE hijo_restrict (
    id_hijo  INT PRIMARY KEY AUTO_INCREMENT,
    detalle  VARCHAR(50),
    id_padre INT NOT NULL,
    FOREIGN KEY (id_padre) REFERENCES padre(id_padre)
        ON DELETE RESTRICT
);

CREATE TABLE hijo_cascade (
    id_hijo  INT PRIMARY KEY AUTO_INCREMENT,
    detalle  VARCHAR(50),
    id_padre INT NOT NULL,
    FOREIGN KEY (id_padre) REFERENCES padre(id_padre)
        ON DELETE CASCADE
);

-- Para SET NULL la columna TIENE que aceptar NULL. Si la declaras
-- NOT NULL, MySQL rechaza la FK al crearla (ERROR 1830).
CREATE TABLE hijo_setnull (
    id_hijo  INT PRIMARY KEY AUTO_INCREMENT,
    detalle  VARCHAR(50),
    id_padre INT NULL,
    FOREIGN KEY (id_padre) REFERENCES padre(id_padre)
        ON DELETE SET NULL
);

INSERT INTO padre (nombre) VALUES ('Padre A'), ('Padre B'), ('Padre C');

INSERT INTO hijo_restrict (detalle, id_padre) VALUES ('hijo de A', 1);
INSERT INTO hijo_cascade  (detalle, id_padre) VALUES ('hijo de B', 2);
INSERT INTO hijo_setnull  (detalle, id_padre) VALUES ('hijo de C', 3);

-- ---------------------------------------------------------------------
--  RESTRICT - la base NO te deja
-- ---------------------------------------------------------------------
-- Descomenta y ejecuta:
-- DELETE FROM padre WHERE id_padre = 1;
-- ERROR 1451: Cannot delete or update a parent row: a foreign key
--             constraint fails
--
-- El hijo sigue intacto. Para borrar al padre tenes que resolver
-- los hijos primero. Es el comportamiento por defecto, y es el bueno.

-- ---------------------------------------------------------------------
--  CASCADE - se van los hijos con el padre, en silencio
-- ---------------------------------------------------------------------
SELECT 'antes' AS momento, COUNT(*) AS hijos FROM hijo_cascade;

START TRANSACTION;
DELETE FROM padre WHERE id_padre = 2;           -- no da error
SELECT 'despues' AS momento, COUNT(*) AS hijos FROM hijo_cascade;
--  0 hijos. Nadie te aviso. Por eso CASCADE es comodo y peligroso:
--  usalo solo cuando el hijo NO tiene sentido sin el padre.
ROLLBACK;

-- ---------------------------------------------------------------------
--  SET NULL - el hijo sobrevive, pero queda huerfano
-- ---------------------------------------------------------------------
SELECT id_hijo, detalle, id_padre FROM hijo_setnull;

START TRANSACTION;
DELETE FROM padre WHERE id_padre = 3;
SELECT id_hijo, detalle, id_padre FROM hijo_setnull;
--  El hijo sigue ahi, con id_padre = NULL.
--  Sirve cuando el hijo vale por si mismo: una materia sin docente
--  asignado sigue siendo una materia.
ROLLBACK;

-- ---------------------------------------------------------------------
--  Como ver que quedo declarado
-- ---------------------------------------------------------------------
SHOW CREATE TABLE hijo_cascade;

-- RESUMEN
--   RESTRICT  (default)  te frena. El mas seguro.
--   CASCADE              borra los hijos sin avisar.
--   SET NULL             deja los hijos sin padre. Requiere columna NULL.
