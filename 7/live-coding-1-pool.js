// =====================================================================
//  LIVE CODING 1  --  Conecta Node con la base escuela
// =====================================================================
//  node live-coding-1-pool.js
// =====================================================================
import { pool, testConnection } from "./config/db.js";

// TODO 1: mostrar de donde salen los datos de conexion (process.env.*)

// TODO 2: llamar a testConnection() y guardar el resultado

// TODO 3: si conecto, traer 3 estudiantes
//   OJO: va con await, y se desestructura const [rows]
//   const [rows] = await pool.query("SELECT * FROM estudiante LIMIT 3");

// TODO 4: ver el mensaje de error cuando MySQL no esta
//   opcion a: apagar MySQL en XAMPP y volver a correr
//   opcion b: crear otro pool con port: 3999 y pedirle una conexion

// TODO 5: cerrar el pool con await pool.end() para que el proceso termine
