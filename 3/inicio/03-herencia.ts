// extends hereda propiedades y métodos. super() llama al constructor del padre.

class Animal {
  constructor(public nombre: string) {}

  comer(): string {
    return `${this.nombre} está comiendo`;
  }

  dormir(): string {
    return `${this.nombre} está durmiendo`;
  }
}

// TODO: class Perro extends Animal, que agregue raza y un método ladrar()
//       Ojo: super(nombre) va primero

const firulais = new Perro("Firulais", "Labrador");

console.log(firulais.comer()); // heredado
console.log(firulais.ladrar()); // propio

// TODO: comentá el super() y leé el error. Después volvé a ponerlo

// Override completo: ignora al padre
// TODO: class Gato extends Animal que redefina comer()

// Override que reutiliza al padre: super.comer() + algo
// TODO: class Vaca extends Animal que use super.comer()

// TODO: imprimí comer() de un Gato y de una Vaca y compará

// Herencia es "ES UN", no "TIENE UN"
console.log("firulais instanceof Perro:", firulais instanceof Perro);
console.log("firulais instanceof Animal:", firulais instanceof Animal);
