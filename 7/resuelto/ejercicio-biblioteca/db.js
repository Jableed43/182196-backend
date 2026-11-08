// =====================================================================
//  EJERCICIO, punto 2 — el pool de mysql2/promise
// =====================================================================
//  Mismo patron que config/db.js del proyecto, pero apuntando a la
//  base `biblioteca`. Un solo createPool.
// =====================================================================

import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",            // en XAMPP va vacia
    database: "biblioteca",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
