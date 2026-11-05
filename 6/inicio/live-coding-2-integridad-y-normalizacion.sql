-- #####################################################################
-- #
-- #   LIVE CODING 2 - Declarar una FK y verla proteger los datos
-- #
-- #####################################################################
--
--   Pasos de la slide:
--
--     1. Proba RESTRICT: intenta borrar un padre con hijos.
--     2. Compara ON DELETE CASCADE y SET NULL.
--     3. Normaliza: que cada dato viva en un solo lugar.
--
-- #####################################################################

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


-- ---------------------------------------------------------------------
--  RESTRICT vs CASCADE vs SET NULL
-- ---------------------------------------------------------------------
-- TODO: padre (id_padre, nombre)
-- TODO: hijo_restrict, hijo_cascade y hijo_setnull, cada uno con una FK
--       a padre y un ON DELETE distinto.
--       Ojo: para SET NULL la columna tiene que aceptar NULL.
-- TODO: un padre y un hijo para cada caso

-- TODO: borra el padre del hijo_restrict. Que pasa? Anota el error.
-- TODO: borra el padre del hijo_cascade. Cuantos hijos quedan?
-- TODO: borra el padre del hijo_setnull. El hijo sigue? Con que id_padre?
-- TODO: cual de los tres usarias por defecto, y por que?
