// La clase es el molde. Las instancias salen de ella con new.

// TODO: class Personaje con nombre (string) y vida (number),
//       constructor, recibirDanio(cantidad) y mostrarEstado(): string

const guerrero = new Personaje("Ragnar", 100);
const maga = new Personaje("Lagertha", 80);

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

// Los objetos viajan por referencia
const a = new Personaje("Ana", 100);
const b = a; // no es una copia
b.vida = 50;

console.log("a.vida:", a.vida);
console.log("a === b:", a === b);

// TODO: creá un tercer personaje con los mismos datos que 'a'
//       y compará con ===  ¿da true o false? ¿por qué?
