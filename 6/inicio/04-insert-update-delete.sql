-- Requiere que el archivo 03 ya haya creado 'cliente' y 'pedido'.

USE modelado;

-- =====================  INSERT  =====================

-- TODO: insertá 2 clientes nuevos en UNA sola sentencia

-- LAST_INSERT_ID() devuelve el id que se acaba de generar.
-- Es lo que vas a usar desde Node para insertar un padre y después sus hijos.
INSERT INTO cliente (nombre, email) VALUES ('Nora Vega', 'nora@mail.com');
SELECT LAST_INSERT_ID() AS 'id recien creado';

-- TODO: insertá un pedido de Nora usando LAST_INSERT_ID()

-- Lo que el INSERT no deja hacer. Descomentá de a uno:
-- INSERT INTO cliente (nombre, email) VALUES ('Otra', 'nora@mail.com');
-- INSERT INTO cliente (nombre) VALUES ('Sin email');
-- INSERT INTO pedido (fecha, producto, precio, idcliente) VALUES ('2026-04-03', 'Tablet', 300000.00, 999);

-- =====================  UPDATE  =====================
-- La costumbre que salva: WHERE antes que SET, y un SELECT antes de ejecutar.

-- TODO: 1) SELECT del cliente que vas a tocar
-- TODO: 2) el UPDATE de su telefono, con el MISMO where
-- TODO: 3) SELECT para confirmar

-- TODO: subile 10% el precio a los pedidos de 'Teclado'.
--       El SET puede usar el valor anterior de la propia columna.

-- --- EL UPDATE SIN WHERE, con red ---
SELECT idcliente, nombre, telefono FROM cliente;

START TRANSACTION;
-- TODO: UPDATE cliente SET telefono = '000-000';   (sin WHERE)
-- TODO: SELECT ROW_COUNT()   <- va PEGADO al UPDATE, sin nada en el medio
-- TODO: mirá la tabla: ¿cuántas filas cambiaron?
ROLLBACK;

SELECT idcliente, nombre, telefono FROM cliente;   -- intacto

-- =====================  DELETE  =====================

-- TODO: borrá el pedido 1 (mirándolo antes con un SELECT)

-- La integridad referencial también actúa acá. Descomentá:
-- DELETE FROM cliente WHERE idcliente = 1;
-- TODO: anotá el error y explicá qué te está protegiendo

-- TODO: borrá un cliente que NO tenga pedidos. ¿Ese sí funciona?

-- --- EL DELETE SIN WHERE, con red ---
SELECT COUNT(*) AS 'pedidos antes' FROM pedido;

START TRANSACTION;
-- TODO: DELETE FROM pedido;  y contá las filas que quedaron
ROLLBACK;

SELECT COUNT(*) AS 'pedidos despues' FROM pedido;

-- TODO: anotá tres diferencias entre DELETE y TRUNCATE
