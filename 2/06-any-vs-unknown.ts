// any apaga TypeScript para esa variable
let dato: any;
dato = 5;

// Compila sin quejarse y explota en ejecución
try {
  dato.metodoQueNoExiste();
} catch (error) {
  console.log("any dejó pasar el error:", (error as Error).message);
}

// Y es contagioso: todo lo que toca queda sin revisar
const deLaApi: any = { usuario: { nombre: "javier" } };
const nombre = deLaApi.usuario.nombre;
const largo = nombre.length;

// unknown acepta todo igual, pero obliga a comprobar antes de usar
let seguro: unknown;
seguro = 5;
seguro = "cinco";

// seguro.metodoQueNoExiste();

// TODO: largoDeTexto(valor: unknown): number -> usar typeof, devolver 0 si no es string

interface Usuario {
  id: number;
  email: string;
}

// Type guard: le enseña al compilador a reconocer el tipo
// TODO: esUsuario(valor: unknown): valor is Usuario
//       comprobar que es objeto, no null, y que id y email tengan el tipo correcto

// TODO: procesar(cuerpo: unknown): string -> si no es Usuario, rechazarlo

console.log("any contagiado:", nombre, largo);

// TODO: imprimí largoDeTexto() con un texto y con un número,
//       y procesar() con un usuario válido y con uno inválido
