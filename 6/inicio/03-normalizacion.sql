-- 03 — Normalizacion · la tabla de Pedidos

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

-- PARTE 1 · Sin normalizar
DROP TABLE IF EXISTS Pedidos_plano;

-- TODO: Pedidos_plano (id_pedido, cliente, email_cliente, producto, fecha)
-- TODO: insertá 4 pedidos de Ana y 1 de Luis, repitiendo el email

-- TODO: Ana cambia de email. Actualizá SOLO los pedidos anteriores
--       al 2026-03-07 y después agrupá por email_cliente.
--       Cuántos emails distintos tiene Ana ahora?  <- la anomalia

-- TODO: pensá las otras dos anomalias:
--       de insercion (un cliente sin pedidos) y de borrado

-- PARTE 2 · Normalizado
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Clientes;

-- TODO: Clientes (id_cliente, nombre, email UNIQUE)
-- TODO: Pedidos  (id_pedido, producto, fecha, id_cliente FK)
-- TODO: los mismos datos, ahora sin repetir el email

-- TODO: armá la vista completa con un JOIN
-- TODO: cambiá el email de Ana. Cuántas filas tocaste ahora?
-- TODO: insertá un cliente sin pedidos. Se puede?
