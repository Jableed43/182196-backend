# Clase 05 — Introducción a Bases de Datos

Hasta ahora los datos vivían en la RAM y morían al cerrar el programa. Acá
empiezan a quedar guardados.

## Arrancar

No hay `npm install` en esta clase. Hacen falta dos cosas:

1. **El servidor.** Abrí el *XAMPP Control Panel*, fila **MySQL**, botón
   **Start**. Tiene que quedar en verde.
2. **El cliente.** En MySQL Workbench, en la pantalla de inicio, el **`+`** al
   lado de *MySQL Connections*:
   - Connection Name: lo que quieras (ej. `xampp local`)
   - Hostname: `localhost` · Port: `3306` · Username: `root`
   - Password: **dejala vacía**, no toques *Store in Vault*
   - **Test Connection** antes de aceptar.

## El orden de los archivos

| Archivo | Qué es |
| :--- | :--- |
| `00-verificar-entorno.sql` | **corré esto primero.** 5 pruebas; si pasan, el resto funciona |
| `01-dataset.sql` | los datos de la clase. Ya está hecho, solo ejecutalo |
| `02-select-y-where.sql` | consultar y filtrar |
| `03-la-trampa-del-null.sql` | el error silencioso más común de SQL |
| `04-orden-distinct-limit.sql` | ordenar, no repetir, cortar |
| `05-crear-tablas-y-constraints.sql` | crear tablas y restricciones |
| `06-ejercicio-tiendavirtual.sql` | el ejercicio de clase |

Los dos primeros vienen resueltos: son herramientas, no ejercicio. Del `02` al
`06` las consultas las escribís vos debajo de cada consigna.

`01-dataset.sql` se puede correr **las veces que quieras**: borra todo y lo
vuelve a crear. Si rompés los datos probando, lo corrés de nuevo y listo.

## Cómo ejecutar en MySQL Workbench

- **Una sola consulta**: cursor encima y `Ctrl + Enter`.
- **Todo el archivo**: `Ctrl + Shift + Enter`.

Están los dos en el menú **Query** si los atajos no te responden.

Al principio conviene ir de una en una: así ves qué devuelve cada cosa.

Y mirá siempre el panel **Action Output**, abajo. Ahí aparece cada sentencia con
su resultado, y también los **warnings**, que son errores que no te cortan la
ejecución pero cambiaron tus datos. El punto 2 de acá abajo es exactamente eso.

## Cuatro cosas que te van a morder

**1. `No database selected`.** Crear la base no es lo mismo que usarla. Hacen
falta los dos comandos, y el segundo se olvida siempre.

**2. El MySQL de XAMPP no es estricto.** Viene configurado de forma que algunas
restricciones **no dan error**: guarda un valor distinto al que pusiste y
sigue como si nada. Por eso los archivos `05` y `06` arrancan con una línea
`SET sql_mode = ...`. **No la borres.**

**3. Los acentos.** Si al cargar los datos ves `Gómez` en lugar de `Gómez`,
el cliente está leyendo el archivo con la codificación equivocada. Por eso los
scripts arrancan con `SET NAMES utf8mb4`.

**4. La base nueva no aparece en el panel de la izquierda.** Workbench no lo
refresca solo: creás `clase05` y en el *Navigator* no está. No está roto.
Click derecho en el panel **Schemas** → **Refresh All**.

## Si algo falla

| Síntoma | Causa |
| :--- | :--- |
| `Can't connect to MySQL server` | MySQL no está encendido en XAMPP |
| `No database selected` | falta usar la base después de crearla |
| `Unknown database 'clase05'` | no corriste `01-dataset.sql` |
| `Table 'alumno' doesn't exist` | estás en otra base |
| Una consulta devuelve 0 filas y no entendés por qué | sospechá de `NULL`: ver el archivo `03` |
| Un `INSERT` que debería fallar no falla | falta el `SET sql_mode` |
| La base que creaste no aparece a la izquierda | Schemas → click derecho → Refresh All |
| `Error Code: 1175 ... safe update mode` | es el *Safe Updates* de Workbench, y te está salvando: te falta el `WHERE` |
