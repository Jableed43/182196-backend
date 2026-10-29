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
export class MotorElectrico implements Motor {
    public estaEncendido: boolean = false;
    public tipoCombustible: TipoCombustible = TipoCombustible.BATERIA;

    arrancar(): void {
        if(this.estaEncendido){
            console.log("El motor electrico ya estaba encendido")
            return
        }
        this.estaEncendido = true;
        console.log(`Motor de electrico encedido (${this.tipoCombustible})`)
    }

    apagar(): void{
        if(!this.estaEncendido){
            console.log("El motor de electrico ya esta apagado")
            return
        }
        this.estaEncendido = false;
        console.log(`Motor de electrico apagado (${this.tipoCombustible})`)
    }
}