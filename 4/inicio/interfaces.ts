// PASO 2 - interfaces.ts

import type { TipoCombustible } from "./partes.js";

// El CONTRATO que van a firmar los motores del paso 3.
//
// Un motor, cualquiera sea, tiene que poder arrancarse y apagarse, y tiene
// que poder decir si esta encendido y con que combustible anda.
//
// Escribilo como contrato: define QUE debe tener, nunca COMO lo hace.
// Si en este archivo te aparece una llave que abre un cuerpo, te fuiste.
export interface Motor {
    arrancar(): void;
    apagar(): void;
    estaEncendido: boolean;
    tipoCombustible: TipoCombustible;
}