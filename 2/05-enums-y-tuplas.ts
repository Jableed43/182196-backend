// Enum numérico
enum NivelAcceso {
  Bajo = 1,
  Medio = 2,
  Alto = 3,
}

const miPermiso = NivelAcceso.Alto;

// Va para los dos lados: del número al nombre
const deNumeroANombre = NivelAcceso[3];

// Enum de texto
// TODO: enum TipoRueda con CIUDAD, DEPORTIVA y TODOTERRENO,
//       y una const ruedas que use una de las opciones
enum TipoRueda {
  CIUDAD = "Ciudad",
  DEPORTIVA = "Deportiva",
  TODOTERRENO = "Todoterreno"
}
// const malas: TipoRueda = "Ciudad";
const ruedas: TipoRueda = TipoRueda.TODOTERRENO

// La alternativa liviana: desaparece al transpilar
// TODO: type Nivel con "bajo", "medio" y "alto"

type Nivel = "bajo" | "medio" | "alto"
const nivel: Nivel = "alto";

// Tupla: longitud fija, un tipo por posición
let usuario: [string, number] = ["Juan", 25];
let ubicacion: [number, number] = [-34.6, -58.4];

// TODO: una tupla [string, number?] y otra con nombres [lat, lon]

// usuario = [25, "Juan"];

// Controla la longitud al crear, pero no frena el push
const par: [string, number] = ["a", 1];
par.push(99);

console.log("miPermiso:", miPermiso);
console.log("NivelAcceso[3]:", deNumeroANombre);
console.log("nivel:", nivel);
console.log("usuario:", usuario, "| ubicacion:", ubicacion);
console.log("par después del push:", par, "| longitud:", par.length);

// TODO: imprimí ruedas y las dos tuplas que agregaste
