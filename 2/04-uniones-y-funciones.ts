// Unión: uno de varios tipos, no cualquiera
type ID = string | number;

let usuarioId: ID = "abc-123";
usuarioId = 5;

// usuarioId = true;

let confirmado: boolean | null | undefined = false;
confirmado = null;
confirmado = undefined;

// Literal: el tipo es el valor exacto
// TODO: type EstadoDeCarga con "cargando", "descargado" y "cargado"

let estado: EstadoDeCarga = "cargando";
estado = "cargado";

// estado = "cargada";

// Función tipada: entra y sale
// TODO: calcularTotal(precio, cantidad): number

// calcularTotal("100", 2);

// ? = parámetro opcional
function saludar(nombre: string, titulo?: string): string {
  return titulo ? `Hola, ${titulo} ${nombre}` : `Hola, ${nombre}`;
}

// Valor por defecto: el tipo se infiere
function potencia(base: number, exponente = 2): number {
  return base ** exponente;
}

// void = no devuelve nada
function registrar(mensaje: string): void {
  console.log(`[log] ${mensaje}`);
}

// Si es una unión, hay que preguntar qué es antes de usarla
// TODO: mostrarId(id: ID): string -> usar typeof para separar number de string

console.log(saludar("javier"));
console.log(saludar("javier", "profe"));
console.log(potencia(5), potencia(2, 10));
console.log("estado:", estado, "| confirmado:", confirmado, "| usuarioId:", usuarioId);
registrar("listo el bloque 3");

// TODO: imprimí calcularTotal() y mostrarId() con un número y con un texto
