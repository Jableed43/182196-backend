const mensaje: string = "Hola Backend";

function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}

// saludar(42);

console.log(mensaje);
console.log(saludar("Backend"));

// TODO: en la terminal, correr en este orden
//   npx tsc 02-entorno.ts     -> genera el .js
//   abrir el .js              -> ¿qué desapareció?
//   node 02-entorno.js        -> lo ejecuta
//   npx tsx 02-entorno.ts     -> sin generar nada
