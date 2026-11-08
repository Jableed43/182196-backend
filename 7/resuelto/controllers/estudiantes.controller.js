// =====================================================================
//  controllers/estudiantes.controller.js  --  ATIENDE LA PETICION
// =====================================================================
//  El controller es el traductor entre HTTP y la capa de datos:
//    - saca los datos del req (params, body)
//    - llama a UNA funcion del service
//    - decide el codigo de estado y arma el res
//  No tiene SQL. Ni una linea.
// =====================================================================

import {
    getEstudiantes,
    getEstudianteById,
    crearEstudiante,
    actualizarEstudiante,
    borrarEstudiante
} from "../services/estudiantes.service.js";

export const listar = async (req, res) => {
    try {
        const estudiantes = await getEstudiantes();
        res.json({ total: estudiantes.length, estudiantes });
    } catch (error) {
        console.error("[ERROR] listar:", error.message);
        res.status(500).json({ error: "Error al consultar estudiantes" });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const estudiante = await getEstudianteById(req.params.id);

        // El service devolvio null -> aca se traduce a un 404.
        if (!estudiante) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        res.json(estudiante);
    } catch (error) {
        console.error("[ERROR] obtenerPorId:", error.message);
        res.status(500).json({ error: "Error al consultar el estudiante" });
    }
};

export const crear = async (req, res) => {
    try {
        const { nombre, apellido, email, fecha_nacimiento } = req.body;

        // Validacion minima. La de verdad llega en la clase 14
        // (express-validator): la base NO siempre valida.
        if (!nombre || !apellido || !email || !fecha_nacimiento) {
            return res.status(400).json({
                error: "Faltan datos: nombre, apellido, email y fecha_nacimiento"
            });
        }

        const nuevo = await crearEstudiante(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        // Email repetido: el UNIQUE de la base lo rechaza.
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Ese email ya esta registrado" });
        }
        console.error("[ERROR] crear:", error.message);
        res.status(500).json({ error: "Error al crear el estudiante" });
    }
};

export const actualizar = async (req, res) => {
    try {
        const estudiante = await actualizarEstudiante(req.params.id, req.body);
        if (!estudiante) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        res.json(estudiante);
    } catch (error) {
        console.error("[ERROR] actualizar:", error.message);
        res.status(500).json({ error: "Error al actualizar el estudiante" });
    }
};

export const borrar = async (req, res) => {
    try {
        const borrado = await borrarEstudiante(req.params.id);
        if (!borrado) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        // OJO: en la base `escuela`, la FK de inscripcion esta declarada
        // ON DELETE CASCADE, asi que borrar un estudiante TAMBIEN borra sus
        // inscripciones, en silencio. Este catch es para las tablas que SI
        // estan protegidas con RESTRICT (error 1451, como en la clase 06).
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                error: "No se puede borrar: el estudiante tiene inscripciones"
            });
        }
        console.error("[ERROR] borrar:", error.message);
        res.status(500).json({ error: "Error al borrar el estudiante" });
    }
};
