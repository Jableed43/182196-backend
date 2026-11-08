// =====================================================================
//  config/db.js  --  EL POOL
// =====================================================================
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// TODO 1: crear el pool con mysql.createPool({ ... })
//   host, user, password, database, port -> desde process.env con un default
//   waitForConnections: true
//   connectionLimit: 10
//   queueLimit: 0
export const pool = null;

// TODO 2: testConnection()
//   pedir una conexion con await pool.getConnection()
//   avisar que conecto, hacer connection.release() y devolver true
//   en el catch, mostrar error.message y devolver false
export const testConnection = async () => {
};
