// La clase es el molde. Las instancias salen de ella con new.

// TODO: class Personaje con nombre (string) y vida (number),
//       constructor, recibirDanio(cantidad) y mostrarEstado(): string
class Personaje {
  // propiedades -> lo que el objeto sabe
  nombre: string;
  vida: number;

  // constructor -> arma el objeto
  constructor(nombre: string, vida: number){
    this.nombre = nombre;
    this.vida = vida;
  }

  // metodos -> lo que el objeto sabe hacer
  recibirDanio(cantidad: number): void {
    this.vida -= cantidad
    // this.vida = this.vida - cantidad
    if(this.vida <= 0){
      console.log(`${this.nombre} ha caído, se fue al Valhalla.`)
    }
  }

  mostrarEstado(): string {
    return `${this.nombre} - Vida: ${this.vida}`
  }

}

const guerrero = new Personaje("Ragnar", 100);
const maga = new Personaje("Lagertha", 80);
const clerigo = new Personaje("Floki", 90);

guerrero.recibirDanio(20);

console.log(guerrero.mostrarEstado());
console.log(maga.mostrarEstado()); // no la tocó nadie

// this se puede perder: depende de CÓMO llamás al método
const metodoSuelto = guerrero.recibirDanio;

try {
  metodoSuelto(10); // acá adentro this ya no es guerrero
} catch (error) {
  console.log("el método suelto rompe:", (error as Error).message);
}

// TODO: arreglalo con una arrow function y volvé a llamarlo
const bienLlamado = () => guerrero.recibirDanio(10)
bienLlamado()
console.log("con arrow function funciona. vida:", guerrero.vida);


// Los objetos viajan por referencia
const a = new Personaje("Ana", 100);
const b = a; // no es una copia
b.vida = 50;

console.log("a.vida:", a.vida);
console.log("a === b:", a === b);

// TODO: creá un tercer personaje con los mismos datos que 'a'
//       y compará con ===  ¿da true o false? ¿por qué?
const c = new Personaje("Ana", 100);
console.log("a === c:", a === c)