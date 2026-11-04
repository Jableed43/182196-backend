-- =====================================================================
--  00 — La base de trabajo de la clase
--  Clase 06 · Modelado de datos y relaciones
-- =====================================================================
--  Corré este archivo PRIMERO. Los demás asumen que ya estás acá.
--  Se puede volver a correr cuantas veces quieras: borra y crea de nuevo.
-- =====================================================================

DROP DATABASE IF EXISTS modelado;
CREATE DATABASE modelado
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE modelado;

-- ¿Por qué utf8mb4? Para que entren tildes, ñ y emojis. Si la base queda
-- en otro juego de caracteres, "Núñez" se guarda roto y no hay vuelta atrás.

SELECT DATABASE() AS 'base en uso';
