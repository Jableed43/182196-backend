// PASO 1 - partes.ts
//
// Las piezas mas simples del sistema y los valores que el dominio acepta.
//
// 1) Los dos conjuntos CERRADOS de valores: los combustibles posibles
//    (uno de ellos es la bateria) y los tipos de rueda.
//    Pensa que estructura de TypeScript evita que alguien escriba "Vateria".

export enum TipoCombustible {
    BATERIA = "Bateria",
    NAFTA = "Nafta",
    DIESEL = "Diesel",
    HIBRIDO = "Hibrido"
}

export enum TipoRueda {
    DEPORTIVA = "Deportiva",
    TODO_TERRENO = "Todo terreno",
    CALLE = "Calle"
}

//
// 2) El chasis, que solo sabe de que color es. Nadie debe poder cambiarle
//    el color por asignacion directa: tiene que pasar por un metodo.
//    Aprovecha ese metodo para avisar por consola el cambio.
//

export class Chasis {
    private color: string;

    constructor(color: string){
        this.color = color;
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void{
        console.log(` (Chasis) color ${this.color} -> ${color} `)
        this.color = color;
    }
}

let golcito = new Chasis("gris")
console.log(golcito.getColor())
golcito.setColor("negro")
console.log(golcito.getColor())

// 3) Las ruedas, que saben su rodado y su tipo. Mismo criterio que el chasis.
//
// Recorda: los otros archivos van a necesitar todo esto.

export class Ruedas {
    private rodado: number;
    private tipo: TipoRueda;

    constructor(rodado: number, tipo: TipoRueda){
        this.rodado = rodado;
        this.tipo = tipo;
    }

    public getRodado(): number{
        return this.rodado;
    }

    public setRodado(rodado: number): void{
        this.rodado = rodado;
    }

    public getTipo(): TipoRueda{
        return this.tipo;
    }
}

const pirelli_18 = new Ruedas(18, TipoRueda.CALLE)
console.log(pirelli_18.getTipo())
console.log(pirelli_18.getRodado())
pirelli_18.setRodado(22)
console.log(pirelli_18.getRodado())
