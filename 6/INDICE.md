# Clase 06 — Modelado de Datos y Relaciones

Base: **`modelado`** · XAMPP/MariaDB · sin password.
Todo corre en cualquier orden y se puede repetir.

---

## Archivos

Mismos nombres arriba y en `inicio\`. Un archivo por Live Coding del deck.

| archivo | Live Coding de la slide | apunte |
|---|---|---|
| `00-crear-base.sql` | — correlo primero | — |
| `live-coding-1-relaciones.sql` | **LC 1** · Relaciones reales · 1:N, N:M, PK y FK | 1.3 / 1.4 |
| `live-coding-2-integridad-y-normalizacion.sql` | **LC 2** · FK que protege · RESTRICT / CASCADE / SET NULL · normalización | 2.1 / 2.2 |
| `live-coding-3-insert-update-delete.sql` | **LC 3** · INSERT / UPDATE / DELETE · UPDATE con JOIN · DELETE vs TRUNCATE | 3.1–3.3 |
| `ejercicio-escuela.sql` | 📝 Ejercicio de clase, los 7 puntos | — |

- **Raíz** = resuelto, lo que proyectás.
- **`inicio\`** = los mismos con `-- TODO:`, lo que abren ellos.
- `escuela-resuelto-en-clase.sql` = tu solución del ejercicio.
- `_escuela-version-anterior.sql` = tu primera versión, con la convención vieja. No la repartas.

---

## Convención de nombres (la del apunte)

```
Alumnos(id_alumno)    Materias(id_materia)   Inscripciones(id_inscripcion)
Clientes(id_cliente)  Pedidos(id_pedido)
Autores(id_autor)     Libros(id_libro)
```

Nada de `esc_alumno` ni `idalumno`: eso da **ERROR 1054**.

---

## Los errores que van a aparecer (y están bien)

| código | cuándo | qué demuestra |
|---|---|---|
| **1452** | insertar un hijo cuyo padre no existe | integridad referencial |
| **1451** | borrar un padre que tiene hijos | integridad referencial / RESTRICT |
| **1062** | email repetido, o inscribir dos veces | UNIQUE |
| **1054** | `Unknown column` | mezclaste convenciones de nombres |
| **1830** | FK `SET NULL` sobre columna `NOT NULL` | la columna tiene que aceptar NULL |
| **1364** | *no aparece en XAMPP* | `sql_mode` sin `STRICT_TRANS_TABLES` |

---

## Ojo con esto al dar la clase

El apunte **no explica** `JOIN`, `CASCADE`/`SET NULL`, `TRUNCATE`, `LAST_INSERT_ID`,
transacciones ni `sql_mode` — pero el deck los pide en los Live Coding 2 y 3.
`JOIN` no se enseña en ninguna clase de SQL del curso.

Antes del primer JOIN, encuadralo en una frase:
*"esto pega dos tablas por la columna que comparten; lo vemos en detalle más adelante"*.

---

## Clase 05 (Foreign Keys), por si volvés atrás

Usa la base **`escuela`**, no `modelado`. Son distintas, no se pisan.

| slide | archivo (bajo `apuntes-utn\CODIGO\backend\mysql\`) |
|---|---|
| RESTRICT / CASCADE / SET NULL | `5\sql\foreign-keys-clase-05.sql` |
| el dato perdido | `5\migracion-veterinaria\04-lo-que-no-se-puede.sql` |
| declarar la FK | `5\migracion-veterinaria\05-declarar-fk.sql` |
| ver la protección | `5\migracion-veterinaria\06-probar-proteccion.sql` |
| dataset del curso | `1\sql\escuela.sql` |
| guía del profe | `5\Guia-Clase-05-Foreign-Keys.md` |

---

## Si algo se rompe en vivo

```sql
SELECT DATABASE();                  -- ¿estoy parado en modelado?
SHOW TABLES;                        -- ¿están las tablas?
SHOW CREATE TABLE Inscripciones;    -- ¿cómo quedó declarada?
```

Para arrancar de cero: descomentá las dos últimas líneas de `00-crear-base.sql`.
