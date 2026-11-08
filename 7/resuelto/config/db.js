// =====================================================================
//  config/db.js  --  EL POOL. Un solo createPool para toda la app.
// =====================================================================
//  Bloque 1 del apunte (1.1 y 1.2).
//  Este archivo se importa en todos lados; nunca se crea otro pool.
// =====================================================================

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();   // lee el .env si existe; si no, usa los valores por defecto

export const pool = mysql.createPool({
    host:     process.env.MYSQL_HOST     || "localhost",
    user:     process.env.MYSQL_USER     || "root",
    password: process.env.MYSQL_PASSWORD || "",        // en XAMPP va vacia
    database: process.env.MYSQL_DB_NAME  || "escuela",
    port:     Number(process.env.MYSQL_PORT) || 3306,

    waitForConnections: true,   // si no hay conexion libre, espera en cola
    connectionLimit: 10,        // nunca mas de 10 conexiones abiertas
    queueLimit: 0               // 0 = cola sin limite
});

// ---------------------------------------------------------------------
//  testConnection: pide una conexion al pool y la devuelve.
//  Sirve para avisar al arrancar si MySQL esta apagado.
// ---------------------------------------------------------------------
export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("[OK] Conexion a MySQL establecida");
        connection.release();        // la DEVUELVE al pool, no la cierra
        return true;
    } catch (error) {
        console.error("[ERROR] No se pudo conectar a MySQL:", error.message);
        console.error("        Revisa que MySQL este prendido en XAMPP");
        console.error("        y que exista la base. Si no existe, corre");
        console.error("        00-crear-base.sql.");
        return false;
    }
};
