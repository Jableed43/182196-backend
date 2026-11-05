-- =====================================================================
--  00 - La base de trabajo de la clase
--  Clase 06 . Modelado de datos y relaciones
-- =====================================================================
--  Correlo PRIMERO. Se puede volver a correr sin perder nada.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE modelado;

SELECT DATABASE() AS 'base en uso';

-- Por que utf8mb4? Para que entren tildes y enie. Si la base queda en otro
-- juego de caracteres, "Nunez" se guarda roto y no hay vuelta atras.

-- =====================================================================
--  Si en algun momento querés arrancar de cero, descomenta estas dos
--  lineas. OJO: borra TODO lo que hicimos en la clase.
-- =====================================================================
-- DROP DATABASE IF EXISTS modelado;
-- CREATE DATABASE modelado CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
