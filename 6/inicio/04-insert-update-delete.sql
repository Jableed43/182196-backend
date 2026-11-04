-- 04 — INSERT, UPDATE y DELETE

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Clientes;

-- TODO: Clientes (id_cliente, nombre, email UNIQUE, telefono)
-- TODO: Pedidos  (id_pedido, producto, precio, fecha, id_cliente FK)
-- TODO: 3 clientes y 4 pedidos

-- 3.1 INSERT
-- TODO: insertá 2 clientes en UNA sola sentencia
-- TODO: insertá uno y mostrá LAST_INSERT_ID() y usalo para su primer pedido
-- TODO: intentá repetir un email. Anotá el error.
-- TODO: intentá un pedido con id_cliente = 999. Anotá el error.
-- TODO: mirá SELECT @@sql_mode -- esta STRICT_TRANS_TABLES?
--       probá un INSERT sin el email (campo NOT NULL). Da error?

-- 3.2 UPDATE
-- TODO: SELECT primero, UPDATE con el mismo WHERE, SELECT para confirmar
-- TODO: subile 10% el precio a un producto usando precio = precio * 1.10

-- El UPDATE sin WHERE, con red:
-- TODO: START TRANSACTION, UPDATE sin WHERE sobre telefono,
--       SELECT ROW_COUNT() pegado al UPDATE, mirá el desastre, ROLLBACK

-- 3.3 DELETE
-- TODO: SELECT primero, DELETE de un pedido puntual
-- TODO: intentá borrar un cliente que tiene pedidos. Anotá el error.
-- TODO: borrá uno que no tenga pedidos
-- TODO: el DELETE sin WHERE, dentro de START TRANSACTION + ROLLBACK

-- TODO: anotá en qué se diferencia TRUNCATE de DELETE
