-- ============================================================
-- 04 - ORDER BY, DISTINCT y LIMIT
-- ============================================================

SET NAMES utf8mb4;
USE clase05;

-- 1. Los productos ordenados por precio, del más barato al más caro.

-- 2. Los mismos, al revés.
--    De los dos sentidos, uno es el que la base usa si no le aclarás
--    nada. ¿Cuál? Probalo sin poner la palabra.

-- 3. Ordenalos por categoría y, DENTRO de cada categoría, por precio
--    de mayor a menor. Se puede ordenar por más de una columna.

-- 4. Ordená los productos por categoría ascendente y fijate DÓNDE
--    quedaron los dos que tienen NULL: ¿al principio o al final?
--    (Esto cambia según el motor de base de datos, no es una regla.)

-- 5. Traé la columna categoria de todos los productos. Salen 10, con
--    repetidos. Ahora traela sin repetidos.

-- 6. ¿Cuántas te dio el punto anterior? Contá las categorías de verdad
--    que hay en los datos. Si los números no coinciden, el culpable es
--    el mismo del archivo 03. Escribí la consulta que trae solo las
--    categorías reales.

-- 7. Los 3 productos más caros. Necesitás dos cláusulas: una que
--     ordene y otra que corte.

-- 8. El producto más barato, con una sola consulta.

-- 9. Probá cortar el resultado SIN ordenar antes. ¿Qué garantía tenés
--    de cuáles 3 filas te va a dar? Ninguna. Por eso van juntas.

-- 10. Todo junto, en una sola consulta: los 3 productos más caros
--     entre los que tienen categoría y cuestan más de $20.000.
--     Las cláusulas van en un orden fijo: FROM, WHERE, ORDER BY, LIMIT.
