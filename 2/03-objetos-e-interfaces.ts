// 1) Tipado en línea: hay que repetirlo en cada variable
let persona1: { nombre: string; id: number; activo: boolean } = {
  nombre: "valentino",
  id: 1,
  activo: true,
};

// 2) type: un molde reutilizable
// TODO: type Persona con nombre, id, edad y activo

const felix: Persona = { nombre: "felix", id: 2, edad: 23, activo: true };
const ana: Persona = { nombre: "ana", id: 3, edad: 31, activo: false };

// 3) interface: el contrato. Solo objetos. Declara métodos, no los implementa.
// TODO: interface Pizza -> masa obligatoria, salsa y queso opcionales, método condimentar

const pizzaCancha: Pizza = {
  masa: true,
  salsa: true,
  condimentar: function (condimento: string) {
    return `Ponele ${condimento}`;
  },
};

// const pizzaRota: Pizza = { salsa: true };

// Mira la forma, no el nombre: nunca dijo ser Persona
const sinEtiqueta = { nombre: "javier", id: 9, edad: 33, activo: true };

// TODO: saludar(persona) -> devuelve un string distinto si está activo o no

// interface se puede reabrir, type no
interface Ventana {
  ancho: number;
}
interface Ventana {
  alto: number;
}
const v: Ventana = { ancho: 1920, alto: 1080 };

console.log(persona1.nombre, felix.nombre, ana.nombre);
console.log("queso:", pizzaCancha.queso);
console.log(pizzaCancha.condimentar("oregano"));
console.log("ventana:", v);

// TODO: imprimí saludar() con felix, con ana y con sinEtiqueta
