-- ============================================================
-- 05 - CREAR TABLAS: tipos de datos y restricciones
-- ============================================================

SET NAMES utf8mb4;

-- IMPORTANTE: dejá esta línea. El MySQL de XAMPP viene configurado
-- de forma que algunas restricciones NO dan error: guarda un valor
-- cambiado y sigue. Esta línea lo pone en modo estricto para esta
-- sesión, y sin ella la mitad de este archivo no va a fallar cuando
-- debería. Más sobre esto en el punto 7.
SET sql_mode = 'STRICT_TRANS_TABLES';

-- 1. Creá una base llamada demo_constraints y deciles a la sesión que
--    la va a usar. Son dos comandos, y olvidarse del segundo da el
--    error más repetido de la clase.

-- 2. Creá una tabla alumno con estos campos, eligiendo el tipo de cada
--    uno y las restricciones que correspondan:
--      - un identificador que se numere solo y no se repita nunca
--      - nombre y apellido: texto corto, los dos obligatorios
--      - email: texto, opcional, pero que no pueda repetirse
--      - promedio: un número con 2 decimales que llegue hasta 99.99
--      - nacimiento: una fecha
--      - activo: verdadero o falso, que arranque en verdadero
--
--    Para el promedio: elegí el tipo pensando que mañana podría ser
--    plata. Hay dos candidatos y uno de los dos guarda aproximaciones.

-- 3. Pedile a la base que te describa la tabla que acabás de crear.
--    Mirá con qué tipo quedó el campo de verdadero/falso. ¿Es el que
--    escribiste vos? ¿Por qué creés que lo cambió?

-- 4. Insertá 2 alumnos completos, SIN pasarles el identificador.
--    Después traelos con un SELECT y mirá qué id les quedó.

-- 5. ROMPER LAS 4 RESTRICCIONES, de una en una.
--    Para cada una, escribí un INSERT que la viole y anotá el número
--    y el texto del error. Son 4 errores distintos:
--      a) un alumno sin nombre
--      b) un alumno con un email que ya existe
--      c) un alumno con un id que ya existe
--      d) un alumno con promedio 1234.56
--
--    Dos de estos cuatro son especiales: sin la línea del SET de
--    arriba, no fallarían. Cuando termines, probá cuáles son.

-- 6. DECIMAL vs FLOAT, la demostración.
--    Creá una tabla con dos columnas: una DECIMAL(10,2) y una FLOAT.
--    Insertá 0.10 en las dos, y después 0.20 en las dos.
--    Sumá cada columna y mirá los dos resultados.
--    Después preguntale a la base si la suma del FLOAT es igual a 0.30.
--    Con esa respuesta ya sabés por qué la plata no va en FLOAT.

-- 7. LOS HUECOS EN LA NUMERACIÓN.
--    Insertá un tercer alumno. Borralo. Insertá un cuarto.
--    ¿Qué id le tocó al cuarto? ¿Está mal que haya un hueco?
--    (Pista: pensá qué promete exactamente una clave primaria.
--     ¿Promete que no se repite, o promete que son consecutivos?)

-- 8. Borrá la base demo_constraints: era solo para probar.
