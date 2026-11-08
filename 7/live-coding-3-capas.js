// =====================================================================
//  LIVE CODING 3  --  Express de cero, y despues la arquitectura en capas
// =====================================================================
//  Este archivo es el server: la capa que arranca todo.
//  node live-coding-3-capas.js   ->  http://localhost:3000/estudiantes
//
//  La teoria de Express esta en EXPRESS-DE-CERO.md. Leela antes.
// =====================================================================

import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import { estudiantesRouter } from "./routes/estudiantes.routes.js";

dotenv.config();

// =====================================================================
//  PASO 0  --  EXPRESS DE CERO
// =====================================================================
//  Un servidor minimo en el puerto 3001, para entender las piezas antes
//  de tocar el proyecto. Al final se cierra.
// =====================================================================

const demo = express();

// TODO 1: una ruta fija
//    demo.get("/hola", (req, res) => res.json({ mensaje: "hola" }))

// TODO 2: una ruta con parametro:  "/eco/:texto"
//    devolver req.params.texto Y typeof req.params.texto
//    -> que tipo es? (spoiler: SIEMPRE string, aunque pidas /eco/7)

// TODO 3: una ruta "/buscar" que devuelva req.query
//    probala con  /buscar?apellido=lopez   -> que es req.query?

// TODO 4: un POST "/sin-json" que devuelva req.body
//    OJO: todavia NO pongas express.json(). Que llega en req.body?

// TODO 5: poner el servidor a escuchar en el 3001
//    const servidorDemo = demo.listen(3001, () => console.log("escuchando"))

// TODO 6: hacerle pedidos desde aca con fetch("http://localhost:3001/...")
//    y mostrar el status y el cuerpo de cada uno.
//    Probá tambien una URL que no existe: que status contesta Express solo?

// --- Error clasico 1: req.body undefined -----------------------------
// TODO 7: agregar  demo.use(express.json())  y una ruta "/con-json".
//    Comparar: antes req.body era undefined, ahora es un objeto.
//    Por que el orden importa? (Express recorre de arriba hacia abajo)

// --- Middleware propio y el next() -----------------------------------
// TODO 8: un middleware que cuente los pedidos:
//    demo.use((req, res, next) => { contador++; next(); })
//    y una ruta que devuelva el contador.
//    Que pasa si saco el next()? (el pedido queda colgado para siempre)

// --- Error clasico 2: contestar dos veces ----------------------------
// TODO 9: una ruta que haga DOS res.json() seguidos, el segundo dentro
//    de un try/catch. Que error tira?
//    -> por eso va un  return  antes de cada res.status(...)

// TODO 10: cerrar el servidor de demo
//    await new Promise(r => servidorDemo.close(r))

// =====================================================================
//  EL PROYECTO EN CAPAS
// =====================================================================

const app = express();
const PORT = process.env.PORT || 3000;

// TODO 11: app.use(express.json())  -- primero, antes de las rutas

// TODO 12: montar el router en "/estudiantes"
//    el camino se SUMA: "/estudiantes" + "/:id"  ->  GET /estudiantes/7

// TODO 13: una ruta GET "/" que devuelva el mapa de las capas

// TODO 14: un 404 AL FINAL, con app.use, para todo lo que no coincidio

// TODO 15: llamar a testConnection() ANTES de escuchar.
//    Si no conecta: avisar y process.exit(1).

// TODO 16: app.listen(PORT, ...) y avisar en que URL quedo escuchando

// El pool NO se cierra: queda vivo mientras el servidor corra.
