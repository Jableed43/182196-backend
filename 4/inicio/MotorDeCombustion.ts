// PASO 3a - MotorDeCombustion.ts

import type { Motor } from "./interfaces.js";
import { TipoCombustible } from "./partes.js";

// El primero de los dos motores que FIRMAN el contrato del paso 2.
//
// Este motor no sabe de antemano con que anda: se lo tienen que decir
// cuando se lo fabrica.
//
// Arranca apagado. Y tanto al arrancarlo como al apagarlo, fijate en que
// estado esta antes de cambiarlo: pedirle que arranque dos veces no deberia
// comportarse como si fuera la primera.
//
// Cuando termines: si te falta algo del contrato, TypeScript te lo va a decir.
export class MotorDeCombustion implements Motor {
    public estaEncendido: boolean = false;
    public tipoCombustible: TipoCombustible;

    constructor(tipoCombustible: TipoCombustible){
        this.tipoCombustible = tipoCombustible
    }

    arrancar(): void {
        if(this.estaEncendido){
            console.log("El motor de combustion ya estaba encendido")
            return
        }
        this.estaEncendido = true;
        console.log(`Motor de combustion encedido (${this.tipoCombustible})`)
    }

    apagar(): void{
        if(!this.estaEncendido){
            console.log("El motor de combustion ya esta apagado")
            return
        }
        this.estaEncendido = false;
        console.log(`Motor de combustion apagado (${this.tipoCombustible})`)
    }
}

let taunus = new MotorDeCombustion(TipoCombustible.NAFTA)
taunus.arrancar()
taunus.apagar()