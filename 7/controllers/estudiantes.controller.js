// =====================================================================
//  controllers/estudiantes.controller.js  --  ATIENDE LA PETICION
// =====================================================================
//  El controller NO tiene SQL. Ni una linea.
//    saca los datos del req  ->  llama a UNA funcion del service
//    ->  decide el codigo de estado  ->  arma el res
// =====================================================================

// TODO: importar las funciones del service

// TODO 1: listar       -> res.json con todos los estudiantes
export const listar = async (req, res) => {
};

// TODO 2: obtenerPorId -> req.params.id; si el service devuelve null, 404
export const obtenerPorId = async (req, res) => {
};

// TODO 3: crear        -> req.body; si faltan datos 400; si entra 201
//         en el catch: si error.code === "ER_DUP_ENTRY" -> 409
export const crear = async (req, res) => {
};

// TODO 4: actualizar   -> si el service devuelve null, 404
export const actualizar = async (req, res) => {
};

// TODO 5: borrar       -> 204 si borro, 404 si no existia
export const borrar = async (req, res) => {
};

// En TODAS: try/catch, y en el catch un res.status(500).
