// PASO 3b - MotorElectrico.ts

import type { Motor } from "./interfaces.js";
import { TipoCombustible } from "./partes.js";

// El segundo motor. Firma el MISMO contrato que el anterior.
//
// La diferencia esta en como se fabrica: a este no hace falta decirle con que
// anda, porque no tiene alternativa.
//
// Que los dos cumplan el mismo contrato de formas distintas es lo que le va a
// permitir al Auto del paso 4 aceptar cualquiera de los dos.
