-- 01 — Cardinalidad 1:N · Autores y Libros
-- La FK va SIEMPRE en el lado "muchos".

CREATE DATABASE IF NOT EXISTS modelado
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelado;

DROP TABLE IF EXISTS Libros;
DROP TABLE IF EXISTS Autores;

-- TODO: Autores (id_autor PK AUTO_INCREMENT, nombre)
-- TODO: Libros  (id_libro PK, titulo, anio, id_autor) + FOREIGN KEY

-- TODO: insertá 3 autores y 5 libros repartidos entre ellos

-- TODO: mostrá cada libro con el nombre de su autor (JOIN)
-- TODO: contá cuántos libros tiene cada autor

-- TODO: intentá insertar un libro con id_autor = 99. Anotá el error.
-- TODO: intentá borrar un autor que tiene libros. Anotá el error.
--       Qué te está protegiendo?
