-- ============================================================
-- 03 - LA TRAMPA DEL NULL
-- Este archivo es un experimento: la idea es que te dé un
-- resultado raro y que después entiendas por qué.
-- ============================================================

SET NAMES utf8mb4;
USE clase05;

-- 1. Listá nombre, apellido y email de todos los alumnos.
--    Contá a ojo cuántos NO tienen email. Anotá ese número.

-- 2. Ahora traé los alumnos que no tienen email, comparando la
--    columna email con NULL usando el = de siempre.
--    ¿Cuántas filas salieron? ¿Dio algún error?

-- 3. Probá ahora la condición CONTRARIA, con <> (distinto de).
--    ¿Cuántas filas salieron esta vez?
--
--    Pará acá y pensalo: una condición y su contraria devolvieron
--    lo mismo. Si fuera una comparación normal, entre las dos
--    tendrían que haber salido los 10 alumnos. Algo no es una
--    comparación normal.

-- 4. Hay dos operadores especiales para preguntar por valores
--    ausentes. No usan el =. Averiguá cuáles son y escribí las dos
--    consultas: los que no tienen email, y los que sí.
--    Los dos números tienen que sumar 10.

-- 5. Para entender la causa, corré esta consulta tal cual está.
--    Mirá bien la tercera columna: no es 1 ni es 0.
SELECT
    1 = 1        AS uno_igual_uno,
    1 = 2        AS uno_igual_dos,
    NULL = NULL  AS null_igual_null,
    NULL IS NULL AS null_is_null;

--    En SQL una comparación puede dar tres cosas, no dos. Y WHERE
--    solo deja pasar las filas donde la condición es verdadera.
--    Con eso, explicá con tus palabras el resultado del punto 2.

-- 6. EL CASO QUE DE VERDAD SE COBRA VÍCTIMAS.
--    Traé los productos que NO son de categoría 'audio'.
--    Contá primero a ojo cuántos deberían ser, y después corré.
--    Te va a faltar alguno. ¿Cuál, y por qué?

-- 7. Corregí la consulta anterior para que traiga todos los que
--    realmente no son de audio.

-- 8. Por último: listá todos los productos, pero que donde dice
--    NULL muestre el texto 'sin categoría'.
--    Buscá una función de MySQL que reemplace los NULL por un valor.
