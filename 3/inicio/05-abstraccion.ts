// Abstracción: exponer el QUÉ y ocultar el CÓMO.

// TODO: class Cafetera con un método público hacerCafe()
//       y tres métodos private con los pasos internos

const cafetera = new Cafetera();
console.log(cafetera.hacerCafe());

// TODO: probá llamar un paso interno desde afuera y leé el error

// abstract: una clase que no se puede instanciar, solo sirve de molde
abstract class Figura {
  constructor(public nombre: string) {}

  // Declara el QUÉ, no dice el CÓMO. Cada hija debe implementarlo.
  abstract calcularArea(): number;

  describir(): string {
    return `${this.nombre} tiene un área de ${this.calcularArea().toFixed(2)}`;
  }
}

// TODO: Circulo (radio) y Rectangulo (ancho, alto), las dos extends Figura

const figuras: Figura[] = [new Circulo(3), new Rectangulo(4, 5)];

for (const figura of figuras) {
  console.log(figura.describir()); // el padre llama al método de la hija
}

// TODO: probá "new Figura(...)" y leé el error
// TODO: probá una hija que NO implemente calcularArea() y leé el error

// interface: solo el contrato, cero código. implements se compromete a cumplirlo.
interface Imprimible {
  aPapel(): string;
}

// TODO: class Factura implements Imprimible, con un numero y aPapel()

const paraImprimir: Imprimible[] = [new Factura("A-0001")];

for (const item of paraImprimir) {
  console.log(item.aPapel());
}
