-- 1:N — un autor escribe muchos libros. ¿Dónde va la clave?

USE modelado;

DROP TABLE IF EXISTS libro;
DROP TABLE IF EXISTS autor;

-- El lado "uno"
CREATE TABLE autor (
    idautor      INT PRIMARY KEY AUTO_INCREMENT,
    nombre       VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50)
) ENGINE=InnoDB;

-- El lado "muchos": acá va la FK
-- TODO: crear 'libro' con idlibro, titulo, anio, idautor
--       y la CONSTRAINT fk_libro_autor que referencia a autor(idautor)

INSERT INTO autor (nombre, nacionalidad) VALUES
    ('Jorge Luis Borges', 'Argentina'),
    ('Ursula K. Le Guin', 'Estados Unidos'),
    ('Italo Calvino',     'Italia');

-- TODO: insertar 5 libros, 3 de Borges y 2 de Le Guin

-- TODO: contar los libros de cada autor (JOIN + GROUP BY)

-- Lo que la FK impide. Descomentá de a uno y leé el error:
-- INSERT INTO libro (titulo, anio, idautor) VALUES ('Libro fantasma', 2024, 99);
-- DELETE FROM autor WHERE idautor = 1;

-- Calvino no tiene libros cargados, así que este sí funciona:
DELETE FROM autor WHERE idautor = 3;

SHOW CREATE TABLE libro;
