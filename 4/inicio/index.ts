// PASO 6 - index.ts
// Correr:  npm start

import { Concesionario } from "./Concesionario.js";
import { MotorDeCombustion } from "./MotorDeCombustion.js";
import { MotorElectrico } from "./MotorElectrico.js";
import { Chasis, Ruedas, TipoCombustible, TipoRueda } from "./partes.js";

// Poner todo a funcionar y, sobre todo, DEMOSTRAR que funciona.
// Cada punto tiene que imprimir algo que lo pruebe.
//
// 1) Un concesionario, y dos autos validos: uno de combustion y uno
//    electrico. Fijate que las piezas se crean acá, afuera del auto.
//    Mostra el inventario.
//
// 2) Proba conducir un auto SIN encenderlo, y despues encendelo y proba otra
//    vez. Las dos salidas juntas son la demostracion.
//
// 3) Proba una de las combinaciones prohibidas del paso 4.
//    Si la pones tal cual, el programa se corta y no ves el resto: necesitas
//    atrapar el error para mostrarlo y seguir.
//    Y despues de atraparlo, mostra cuantos autos hay en el inventario: ese
//    numero es lo que prueba que el auto invalido nunca existio.
//
// 4) Vende uno por su patente. Mostra como quedo cada lista.
//    Proba tambien con una patente que no exista, y mostra que devuelve.
