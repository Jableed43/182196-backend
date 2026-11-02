-- ============================================================
-- 06 - EJERCICIO DE CLASE: "Mi primera base de datos"
-- Los 6 puntos del enunciado. Escribí cada consulta abajo.
-- ============================================================

SET NAMES utf8mb4;
SET sql_mode = 'STRICT_TRANS_TABLES';   -- ver la nota del archivo 05

-- 1. (Ya hecho si corriste 00-verificar-entorno.sql y las 5 pruebas pasaron.)

-- 2. Creá una base de datos llamada TiendaVirtual y empezá a usarla.

-- 3. Creá una tabla Productos con:
--      id         identificador único que se numere solo
--      nombre     texto, obligatorio
--      precio     número con decimales exactos, obligatorio
--      stock      número entero, obligatorio, que arranque en 0
--      categoria  texto
--
--    Una sola de las cinco columnas NO tiene que ser obligatoria.
--    Mirá el punto 4 y vas a ver cuál.

-- 4. Insertá 5 productos. Uno de ellos tiene que quedar SIN categoría.
--    No le pases el id a ninguno.

-- 5. Traé los productos de más de $100, ordenados de mayor a menor.
--    Fijate cuántos salen. Si salen todos, el filtro no te está
--    filtrando nada: probá con un umbral que parta tus datos al medio.

-- 6. Tres consultas más:
--      a) los productos cuyo nombre empieza con una letra a elección
--      b) las categorías que existen, sin repetir
--      c) el producto que quedó sin categoría
--
--    En la (b), contá cuántas filas salen y comparalas con las
--    categorías que cargaste. Si sobra una, ya sabés quién es.
--    En la (c), probá primero con un = y mirá qué pasa.

-- 7. IA Mentor (para después de clase):
--    "Actúa como un experto en bases de datos. Explícame la diferencia
--     entre un lenguaje Imperativo (como JavaScript) y uno Declarativo
--     (como SQL). ¿Por qué en SQL le decimos qué queremos pero no cómo
--     debe buscarlo?"
