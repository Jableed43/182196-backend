-- Normalizar = que cada dato viva en UN SOLO lugar.

USE modelado;

-- =====================  PARTE 1 · Sin normalizar  =====================
DROP TABLE IF EXISTS pedido_plano;

CREATE TABLE pedido_plano (
    idpedido      INT PRIMARY KEY AUTO_INCREMENT,
    fecha         DATE          NOT NULL,
    cliente       VARCHAR(100)  NOT NULL,
    email_cliente VARCHAR(120)  NOT NULL,
    telefono      VARCHAR(30),
    producto      VARCHAR(100)  NOT NULL,
    precio        DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO pedido_plano (fecha, cliente, email_cliente, telefono, producto, precio) VALUES
    ('2026-03-01', 'Ana Pérez',  'ana@mail.com',  '341-555-0001', 'Teclado',   25000.00),
    ('2026-03-03', 'Ana Pérez',  'ana@mail.com',  '341-555-0001', 'Mouse',     12000.00),
    ('2026-03-05', 'Ana Pérez',  'ana@mail.com',  '341-555-0001', 'Monitor',  180000.00),
    ('2026-03-06', 'Luis Gómez', 'luis@mail.com', '341-555-0002', 'Notebook', 950000.00),
    ('2026-03-09', 'Ana Pérez',  'ana@mail.com',  '341-555-0001', 'Webcam',    30000.00),
    ('2026-03-11', 'Luis Gómez', 'luis@mail.com', '341-555-0002', 'Teclado',   25000.00);

SELECT * FROM pedido_plano;

-- TODO: contá cuántas veces está repetido cada email (GROUP BY)

-- --- LA ANOMALÍA DE ACTUALIZACIÓN ---
-- Ana cambia de email. El operador actualiza los pedidos de marzo
-- y no ve el del 09.
-- TODO: hacé ese UPDATE incompleto:
--       WHERE cliente = 'Ana Pérez' AND fecha < '2026-03-07'

-- TODO: ahora preguntale a la base cuál es el email de Ana.
--       ¿Cuántos valores distintos devuelve? ¿Cuál es el correcto?

-- --- ANOMALÍA DE BORRADO ---
-- TODO: borrá los pedidos de Luis.
--       ¿Qué pasó con su nombre, su email y su teléfono?

-- --- ANOMALÍA DE INSERCIÓN ---
-- TODO: intentá dar de alta un cliente que todavía no compró nada.
--       Anotá por qué no se puede en esta tabla.

-- =====================  PARTE 2 · Normalizado  =====================
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS cliente;

-- TODO: crear 'cliente' (idcliente, nombre, email UNIQUE, telefono)

-- TODO: crear 'pedido' (idpedido, fecha, producto, precio, idcliente FK)

-- TODO: cargar los 2 clientes y sus 6 pedidos

-- TODO: hacé el mismo cambio de email de antes. ¿Cuántas filas tocaste?
--       ¿Puede quedar inconsistente ahora?

-- TODO: agregá un cliente sin pedidos (antes era imposible)

-- TODO: borrá los pedidos de Luis. ¿Sigue existiendo Luis?

-- TODO: 'Teclado' aparece dos veces con el mismo precio.
--       ¿Es redundancia que haya que eliminar? Pensalo y anotá tu respuesta.
