// Mismo mensaje, distinta respuesta según el objeto.

class Animal {
  constructor(public nombre: string) {}

  hacerSonido(): string {
    return "Sonido genérico";
  }
}

// TODO: Perro, Gato y Vaca, cada una redefiniendo hacerSonido()
//       Poneles la palabra override adelante

// Un array del tipo del PADRE con objetos de las HIJAS
const animales: Animal[] = [
  new Perro("Firulais"),
  new Gato("Michi"),
  new Vaca("Lola"),
];

// TODO: recorrelo con for...of e imprimí nombre y sonido.
//       Sin un solo if por tipo

// TODO: agregá una clase Oveja, hacé push al array y volvé a recorrer.
//       ¿Hubo que tocar el for?

// Probá el typo: cambiale el nombre al método en una hija (hacerSonidos).
// Con override puesto, TypeScript avisa. Sin override, crea un método nuevo
// en silencio y el animal sigue haciendo el sonido genérico.
