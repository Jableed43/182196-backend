// =====================================================================
//  routes/estudiantes.routes.js  --  DEFINE LAS URLs
// =====================================================================
//  Cada ruta hace UNA cosa: decir que funcion del controller la atiende.
//  Sin logica, sin SQL.
// =====================================================================

import { Router } from "express";
import {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    borrar
} from "../controllers/estudiantes.controller.js";

export const estudiantesRouter = Router();

estudiantesRouter.get("/",        listar);        // GET    /estudiantes
estudiantesRouter.get("/:id",     obtenerPorId);  // GET    /estudiantes/1
estudiantesRouter.post("/",       crear);         // POST   /estudiantes
estudiantesRouter.put("/:id",     actualizar);    // PUT    /estudiantes/1
estudiantesRouter.delete("/:id",  borrar);        // DELETE /estudiantes/1
