-- =====================================================================
--  EJERCICIO DE CLASE — base `biblioteca`  (punto 1)
-- =====================================================================
--  Correlo con:  mysql -u root < biblioteca.sql
--  Se puede correr las veces que haga falta: borra y recrea.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS biblioteca
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE biblioteca;

DROP TABLE IF EXISTS libros;
DROP TABLE IF EXISTS autores;

CREATE TABLE autores (
    id_autor     INT PRIMARY KEY AUTO_INCREMENT,
    nombre       VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(60)  NOT NULL
);

CREATE TABLE libros (
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    titulo   VARCHAR(150) NOT NULL,
    id_autor INT NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
);

SELECT 'biblioteca lista' AS estado;
