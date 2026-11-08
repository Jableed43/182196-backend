// =====================================================================
//  LIVE CODING 3  --  Express de cero, y despues la arquitectura en capas
// =====================================================================
//  Este archivo es el server.js del proyecto: la capa que arranca todo.
//
//  Correlo con:   node live-coding-3-capas.js
//  Despues abri:  http://localhost:3000/estudiantes
//
//  PRIMERA PARTE (paso 0) -- Express de cero.
//     Arranca un servidor minimo en el puerto 3001, se hace preguntas a
//     si mismo, muestra los errores clasicos y lo cierra. Todo en la
//     consola, sin tocar el navegador.
//     La explicacion larga esta en EXPRESS-DE-CERO.md.
//
//  SEGUNDA PARTE -- los 3 pasos de la slide:
//     1. ARQUITECTURA.md -> el recorrido de un pedido por las 5 capas
//     2. routes/estudiantes.routes.js -> cada ruta llama al controller
//     3. README.md -> la comparacion entre el parametro y la concatenacion
// =====================================================================

import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import { estudiantesRouter } from "./routes/estudiantes.routes.js";

dotenv.config();

const print = (texto) => console.log(texto);

// =====================================================================
//  PASO 0  --  EXPRESS DE CERO
// =====================================================================

print("\n#####################################################");
print("#  PASO 0 - EXPRESS DE CERO");
print("#####################################################");

// ---------------------------------------------------------------------
//  0.1 -- Que problema resuelve
// ---------------------------------------------------------------------
print("\n--- 0.1 Por que Express ---");
print("Node solo ya puede atender HTTP, con el modulo http:");
print("");
print("   http.createServer((req, res) => {");
print("     if (req.url === '/estudiantes' && req.method === 'GET') { ... }");
print("     else if (req.url === '/estudiantes' && req.method === 'POST') { ... }");
print("     else { res.writeHead(404); res.end(); }");
print("   })");
print("");
print("Con 5 rutas eso es una cadena de if inmanejable, y el body del POST");
print("hay que juntarlo a pedazos a mano.");
print("Express es una capa arriba de ese MISMO modulo http. Te da 3 cosas:");
print("   1. un router      -> esta URL la atiende esta funcion, sin if");
print("   2. middlewares    -> pasos por los que pasa todo pedido");
print("   3. atajos         -> req.params, req.body, res.json(), res.status()");
print("No es un lenguaje nuevo. Es una libreria:  npm install express");

// ---------------------------------------------------------------------
//  0.2 -- Las cuatro lineas
// ---------------------------------------------------------------------
print("\n--- 0.2 Las 4 lineas que hay que entender ---");
print("   import express from 'express'      <- la libreria");
print("   const app = express()              <- la aplicacion");
print("   app.get('/hola', (req, res) => {}) <- una ruta");
print("   app.listen(3000)                   <- recien aca escucha");
print("");
print("app.get REGISTRA la ruta, no la ejecuta. El handler corre cuando");
print("llega un pedido que coincide con el metodo y el camino.");

// ---------------------------------------------------------------------
//  0.3 -- El servidor minimo, corriendo de verdad
// ---------------------------------------------------------------------
print("\n--- 0.3 Un servidor minimo, corriendo ---");

const demo = express();

//  Una ruta fija
demo.get("/hola", (req, res) => {
    res.json({ mensaje: "hola" });
});

//  Una ruta con parametro. Los :dos puntos marcan un hueco en el camino.
demo.get("/eco/:texto", (req, res) => {
    res.json({
        recibido: req.params.texto,
        tipo: typeof req.params.texto,       // SIEMPRE string, aunque sea un numero
        metodo: req.method
    });
});

//  Lo que viene despues del ? se lee con req.query
demo.get("/buscar", (req, res) => {
    res.json({ query: req.query });
});

//  Un POST, pero todavia SIN express.json() a proposito
demo.post("/sin-json", (req, res) => {
    res.json({ body: String(req.body), tipo: typeof req.body });
});

const servidorDemo = await new Promise(resolve => {
    const s = demo.listen(3001, () => resolve(s));
});
print("Servidor de demo escuchando en el puerto 3001.");

const pedir = async (metodo, camino, cuerpo) => {
    const opciones = { method: metodo };
    if (cuerpo) {
        opciones.headers = { "Content-Type": "application/json" };
        opciones.body = JSON.stringify(cuerpo);
    }
    const respuesta = await fetch("http://localhost:3001" + camino, opciones);
    return { status: respuesta.status, cuerpo: await respuesta.text() };
};

let r = await pedir("GET", "/hola");
print("\nGET /hola            -> " + r.status + "  " + r.cuerpo);

r = await pedir("GET", "/eco/7");
print("GET /eco/7           -> " + r.status + "  " + r.cuerpo);
print("   OJO: tipo 'string'. req.params SIEMPRE trae strings, nunca numeros.");

r = await pedir("GET", "/buscar?apellido=lopez&anio=2026");
print("GET /buscar?...      -> " + r.status + "  " + r.cuerpo);
print("   Eso es req.query: lo que viene despues del ?");

r = await pedir("GET", "/no-existe");
print("GET /no-existe       -> " + r.status + "  (Express contesta 404 solo)");

// ---------------------------------------------------------------------
//  0.4 -- ERROR CLASICO 1: req.body es undefined
// ---------------------------------------------------------------------
print("\n--- 0.4 Error clasico 1: req.body undefined ---");

r = await pedir("POST", "/sin-json", { nombre: "Ana" });
print("POST /sin-json  con  { nombre: 'Ana' }");
print("   -> " + r.cuerpo);
print("   Mandamos un JSON y req.body es undefined. Falta el middleware.");

//  Lo agregamos ahora. El orden importa: va ANTES de las rutas que lo usan.
demo.use(express.json());
demo.post("/con-json", (req, res) => {
    res.json({ body: req.body, tipo: typeof req.body });
});

r = await pedir("POST", "/con-json", { nombre: "Ana" });
print("\nDespues de  app.use(express.json())");
print("POST /con-json       -> " + r.cuerpo);
print("   Ahora si: express.json() lee el cuerpo y lo deja en req.body.");
print("   Si lo registras DESPUES de las rutas no sirve: Express recorre");
print("   lo que registraste de arriba hacia abajo.");

// ---------------------------------------------------------------------
//  0.5 -- Middleware propio y el next()
// ---------------------------------------------------------------------
print("\n--- 0.5 Middleware: todo lo que pasa antes ---");

let pedidosVistos = 0;
demo.use((req, res, next) => {
    pedidosVistos++;
    next();                     // sin esto, el pedido queda colgado para siempre
});
demo.get("/contados", (req, res) => res.json({ vistos: pedidosVistos }));

await pedir("GET", "/contados");
r = await pedir("GET", "/contados");
print("Un middleware propio que cuenta pedidos y llama a next():");
print("GET /contados        -> " + r.cuerpo);
print("   next() NO es opcional: un middleware que no llama a next() ni");
print("   contesta deja el pedido esperando. El navegador gira sin parar.");

// ---------------------------------------------------------------------
//  0.6 -- ERROR CLASICO 2: contestar dos veces
// ---------------------------------------------------------------------
print("\n--- 0.6 Error clasico 2: dos respuestas al mismo pedido ---");

demo.get("/dos-veces", (req, res) => {
    res.json({ respuesta: 1 });
    try {
        res.json({ respuesta: 2 });              // esto explota
    } catch (error) {
        print("   [ERROR] " + String(error.message).split("\n")[0]);
    }
});

r = await pedir("GET", "/dos-veces");
print("GET /dos-veces       -> " + r.status + "  " + r.cuerpo);
print("   Por cada pedido se contesta UNA sola vez.");
print("   De ahi el  return  antes de cada res.status(...) en los controllers.");

// ---------------------------------------------------------------------
//  0.7 -- Los codigos de estado
// ---------------------------------------------------------------------
print("\n--- 0.7 Los codigos que vas a usar hoy ---");
print("   200  salio bien");
print("   201  creaste algo            (el POST)");
print("   204  bien, y sin cuerpo      (el DELETE)");
print("   400  el cliente mando mal los datos");
print("   404  no existe lo que pidio");
print("   409  conflicto: email repetido, o tiene hijos");
print("   500  se rompio algo tuyo");

// ---------------------------------------------------------------------
//  0.8 -- Router: las rutas en su propio archivo
// ---------------------------------------------------------------------
print("\n--- 0.8 Router ---");
print("express.Router() es una app en chiquito: junta rutas y se cuelga");
print("de un camino. El camino se SUMA:");
print("   en el router:  estudiantesRouter.get('/:id', ...)");
print("   en el server:  app.use('/estudiantes', estudiantesRouter)");
print("   resultado:     GET /estudiantes/7");
print("Adentro del router las rutas van RELATIVAS. Si escribis");
print("'/estudiantes' adentro, la URL termina en /estudiantes/estudiantes.");

await new Promise(resolve => servidorDemo.close(resolve));
print("\nServidor de demo cerrado.");
print("(la explicacion completa esta en EXPRESS-DE-CERO.md)");

// =====================================================================
//  EL PROYECTO EN CAPAS
// =====================================================================

print("\n#####################################################");
print("#  LA ARQUITECTURA EN CAPAS");
print("#####################################################");

const app = express();
const PORT = process.env.PORT || 3000;

//  1. El middleware primero, para que req.body exista en el POST.
app.use(express.json());

//  2. Las rutas de estudiante cuelgan de /estudiantes
app.use("/estudiantes", estudiantesRouter);

//  3. Portada: el mapa de las capas, para no perderse en clase
app.get("/", (req, res) => {
    res.json({
        clase: "07 - MySQL2 + Node.js",
        capas: {
            "config/db.js": "la conexion (el pool), una sola vez",
            "services/":    "las consultas SQL de una entidad",
            "controllers/": "atiende la peticion y arma la respuesta",
            "routes/":      "define las URLs",
            "server.js":    "arranca el servidor (este archivo)"
        },
        probar: [
            "GET    /estudiantes",
            "GET    /estudiantes/1",
            "GET    /estudiantes/99999   -> 404",
            "POST   /estudiantes         -> body JSON",
            "PUT    /estudiantes/1       -> { telefono }",
            "DELETE /estudiantes/1       -> 204"
        ]
    });
});

//  4. El 404 va AL FINAL: atrapa todo lo que no coincidio con nada de arriba.
app.use((req, res) => {
    res.status(404).json({ error: `No existe la ruta ${req.method} ${req.path}` });
});

// ---------------------------------------------------------------------
//  Arranque: primero se prueba la base, despues se escucha.
//  Si MySQL esta apagado conviene saberlo ACA, no en la primera peticion.
// ---------------------------------------------------------------------
const conectado = await testConnection();

if (!conectado) {
    console.error("\nEl servidor NO arranca sin base. Prendé MySQL en XAMPP.");
    process.exit(1);
}

app.listen(PORT, () => {
    print(`\nServidor escuchando en http://localhost:${PORT}`);
    print(`   http://localhost:${PORT}/estudiantes`);
    print("   Ctrl+C para cortar.\n");
    print("Un pedido GET /estudiantes/1 recorre:");
    print("   routes -> controller -> service -> pool -> MySQL");
    print("   y vuelve por el mismo camino convertido en JSON.\n");
    print("Si el puerto esta ocupado (EADDRINUSE) quedo un node viejo");
    print("corriendo: cerralo, o cambia PORT en el .env.\n");
});

// El pool NO se cierra: queda vivo mientras el servidor corra.
