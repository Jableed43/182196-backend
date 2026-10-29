// ============================================================
// PASO 6 - index.ts: todas las piezas colaborando
// Correr:  npm start
// ============================================================

import { Concesionario } from "./Concesionario.js";
import { MotorDeCombustion } from "./MotorDeCombustion.js";
import { MotorElectrico } from "./MotorElectrico.js";
import { Chasis, Ruedas, TipoCombustible, TipoRueda } from "./partes.js";

const concesionario = new Concesionario();

// ------------------------------------------------------------
// 1. Fabricar dos autos validos
// ------------------------------------------------------------
// Las piezas se crean AFUERA y se le pasan al auto: eso es componer.
console.log("--- fabricando ---");

concesionario.fabricarAuto(
  new MotorDeCombustion(TipoCombustible.NAFTA),
  new Chasis("negro"),
  new Ruedas(15, TipoRueda.CALLE),
  4000000,
  "ABC123",
);

const electrico = concesionario.fabricarAuto(
  new MotorElectrico(),
  new Chasis("blanco"),
  new Ruedas(18, TipoRueda.DEPORTIVA),
  9500000,
  "XYZ789",
);

for (const auto of concesionario.getAutosDisponibles()) {
  console.log(" ", auto.getDescripcion());
}
console.log("hasta aca")

// ------------------------------------------------------------
// 2. Delegacion: encender y conducir
// ------------------------------------------------------------
console.log("");
console.log("--- antes de encender ---");
console.log(" ", electrico.conducir());

console.log("--- encendemos ---");
electrico.encender();
console.log(" ", electrico.conducir());

// ------------------------------------------------------------
// 3. LA REGLA DE NEGOCIO: el auto invalido nunca llega a existir
// ------------------------------------------------------------
console.log("");
console.log("--- probando la regla de negocio ---");
try {
  concesionario.fabricarAuto(
    new MotorDeCombustion(TipoCombustible.BATERIA), // <- combinacion invalida
    new Chasis("rojo"),
    new Ruedas(16, TipoRueda.CALLE),
    1000000,
    "NOP000",
  );
  console.log("  no deberiamos llegar hasta aca");
} catch (error) {
  console.log("  error controlado:", (error as Error).message);
}
console.log("  autos en inventario:", concesionario.getAutosDisponibles().length, "(sigue siendo 2)");

// ------------------------------------------------------------
// 4. La venta: findIndex + splice
// ------------------------------------------------------------
console.log("");
console.log("--- vendiendo ABC123 ---");
const vendido = concesionario.venderAuto("ABC123");
console.log("  vendido:", vendido?.getDescripcion());
console.log("  fecha de venta registrada:", vendido?.getFechaVenta() !== null);

console.log("  patente que no existe:", concesionario.venderAuto("ZZZ999"));

console.log("");
console.log("  disponibles:", concesionario.getAutosDisponibles().map((a) => a.getPatente()));
console.log("  vendidos:   ", concesionario.getAutosVendidos().map((a) => a.getPatente()));
console.log("  facturado:  $", concesionario.getFacturado().toLocaleString("es-AR"));

// ------------------------------------------------------------
// 5. Encapsulamiento: el setter valida
// ------------------------------------------------------------
console.log("");
console.log("--- el setter que valida ---");
try {
  electrico.setPrecio(-100);
} catch (error) {
  console.log("  setPrecio(-100):", (error as Error).message);
}
electrico.setPrecio(8800000);
console.log("  setPrecio(8800000) -> getPrecio():", electrico.getPrecio());

// DEMO EN VIVO: descomenta y mira el error.
// console.log(electrico.precio);
// Error TS2341: Property 'precio' is private and only accessible within class 'Auto'.

// DEMO EN VIVO: el error de los parentesis olvidados.
// console.log("patente:", electrico.getPatente);
// Ojo: NO da error de compilacion. Imprime  patente: [Function: getPatente]
// Es el bug mas comun de la clase y el compilador no te avisa.
