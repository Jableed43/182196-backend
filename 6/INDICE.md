# Clase 06 — Modelado de Datos y Relaciones · índice único

Base de hoy: **`modelado`** · XAMPP/MariaDB · sin password.
Todos los archivos corren en cualquier orden y se pueden repetir.

---

## 1 · Lo que proyecto en clase

Carpeta: `D:\Users\jl\descargas\utn-2026\182196-backend\6\`

Separado igual que el deck: **un archivo por Live Coding**.

| archivo | Live Coding de la slide | apunte |
|---|---|---|
| `00-crear-base.sql` | — correlo primero | — |
| `live-coding-1-relaciones.sql` | **LC 1** · Relaciones reales en el dataset · 1:N, N:M, PK y FK | 1.3 / 1.4 |
| `live-coding-2-integridad-y-normalizacion.sql` | **LC 2** · Declarar una FK y verla proteger · normalización | 2.1 / 2.2 |
| `live-coding-3-insert-update-delete.sql` | **LC 3** · Insertar, actualizar y borrar con seguridad | 3.1–3.3 |
| `ejercicio-escuela.sql` | 📝 Ejercicio de clase, los 7 puntos | — |

Cada archivo abre con los pasos de su slide y las rutas de los archivos de apoyo
de la cátedra. Corren en cualquier orden y se pueden repetir.

En `inicio\` están los mismos temas con `-- TODO:` para que los completen ellos
(ahí siguen numerados 00–05). `escuela.BACKUP.sql` es tu versión original.

---

## 2 · Los mismos archivos RESUELTOS

Carpeta: `D:\Users\jl\descargas\apuntes-utn\CODIGO\live-coding\backend\clase-06-modelado-datos\completo\`

Mismos nombres, con todo el código escrito y los errores esperados anotados en comentarios.
Si te trabás en vivo, abrís el mismo número de archivo acá.

---

## 3 · Guion y guía

| archivo | para quién |
|---|---|
| `...\clase-06-modelado-datos\GUION-CLASE-06.md` | **vos** — tiempos, qué tipear, qué decir |
| `...\clase-06-modelado-datos\GUIA-ESTUDIANTE.md` | **ellos** — para repartir |

Ruta completa: `D:\Users\jl\descargas\apuntes-utn\CODIGO\live-coding\backend\clase-06-modelado-datos\`

---

## 4 · Convención de nombres (la del apunte)

Tablas en **plural y con mayúscula**, claves con **guión bajo**:

```
Alumnos(id_alumno)   Materias(id_materia)   Inscripciones(id_inscripcion)
Clientes(id_cliente) Pedidos(id_pedido)     Autores(id_autor)   Libros(id_libro)
```

No uses `esc_alumno` ni `idalumno`: es la convención vieja y no coincide con lo que leen ellos.

---

## 5 · Clase 05 (Foreign Keys) — por si volvés atrás

Carpeta: `D:\Users\jl\descargas\apuntes-utn\CODIGO\backend\mysql\5\`

| slide | archivo |
|---|---|
| RESTRICT / CASCADE / SET NULL | `sql\foreign-keys-clase-05.sql` |
| el dato perdido | `migracion-veterinaria\04-lo-que-no-se-puede.sql` |
| declarar la FK | `migracion-veterinaria\05-declarar-fk.sql` |
| ver la protección | `migracion-veterinaria\06-probar-proteccion.sql` |
| dataset del curso | `sql\escuela.sql` |
| guía | `Guia-Clase-05-Foreign-Keys.md` |

⚠️ Esos scripts usan la base **`escuela`**, no `modelado`. Son distintas, no se pisan.

---

## 6 · Los errores que SÍ van a aparecer (y están bien)

| código | cuándo | qué demuestra |
|---|---|---|
| **1452** | insertar un hijo con un padre que no existe | integridad referencial |
| **1451** | borrar un padre que tiene hijos | integridad referencial |
| **1062** | email repetido, o inscribir dos veces | UNIQUE |
| **1054** | `Unknown column` | mezclaste convenciones de nombres |
| **1364** | *no aparece en XAMPP* | el `sql_mode` sin `STRICT_TRANS_TABLES` |

El 1364 es la demo del archivo 04: el `NOT NULL` **no** protege en XAMPP, guarda un string vacío.
Es el mejor pie para express-validator más adelante.

---

## 7 · Si algo se rompe en vivo

```sql
SELECT DATABASE();        -- ¿estoy parado en modelado?
SHOW TABLES;              -- ¿están las tablas?
SHOW CREATE TABLE Inscripciones;   -- ¿cómo quedó declarada?
```

Para arrancar de cero: descomentá las dos últimas líneas de `00-crear-base.sql`.
