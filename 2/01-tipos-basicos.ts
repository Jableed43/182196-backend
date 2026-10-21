let edad: number = 33;
let verdadero: boolean = false;
let nombre: string = "javier";

// edad = "treinta y tres";

// Sin tipo: lo deduce solo
let ciudad = "Rosario";

// TODO: un array de strings y uno de numbers

// Forma genérica, es lo mismo
let frutas: Array<string> = ["manzana", "naranja"];

// Varios tipos en un array
let mixto: (string | number | boolean)[] = [1, 2, "tres", false, true];

// TODO: una matriz 3x3 de tipo number[][]
//       para leer una celda: matriz[1]?.[1]  (el ?. lo pide el tsconfig)

// any acepta cualquier cosa
let valorDinamico: any;
valorDinamico = true;
valorDinamico = 10;
valorDinamico = null;

// Unión: solo string o null
let valorMixto: string | null = "hola";
valorMixto = null;

console.log(edad, verdadero, nombre, ciudad);
console.log(frutas, mixto);
console.log(valorDinamico, valorMixto);

// TODO: imprimí los arrays y el centro de la matriz
