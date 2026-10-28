// PASO 5 - Concesionario.ts

import { Auto } from "./Auto.js";
import type { Motor } from "./interfaces.js";
import { Chasis, Ruedas } from "./partes.js";

// El sistema que administra el inventario. Lleva dos listas privadas: los
// autos que estan a la venta y los que ya se vendieron.
//
// 1) FABRICAR.
//    Recibe las piezas, arma el auto, lo suma al inventario y lo devuelve.
//
// 2) VENDER, a partir de una patente.
//    Vender es MOVER el auto de una lista a la otra, no copiarlo: tiene que
//    desaparecer de los disponibles.
//
//    Y acá esta el problema de la clase: para sacar algo de un array hace
//    falta saber en QUE POSICION esta. Mira los metodos de array que conoces
//    y descarta: hay uno que te devuelve el objeto, otro que te devuelve un
//    array nuevo, y uno solo que te sirve.
//
//    Dos cosas que te van a morder, y es a proposito:
//      - cuando no encuentra nada, ese metodo NO devuelve null. Y lo que
//        devuelve es un valor que un if comun deja pasar.
//      - el metodo que saca el elemento no te devuelve el elemento.
//
//    Antes de devolverlo, dejale registrada la fecha de la venta.
//    Si la patente no existe, el metodo tiene que avisar que no vendio nada.
//
// 3) CONSULTAR las dos listas.
//    Si devolves la lista tal como esta, cualquiera desde afuera puede
//    modificar el inventario. Devolve algo que no se pueda usar para eso.
