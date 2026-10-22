const mensaje: string = "Hola backend";
console.log(mensaje);

function saludar(nombre: string, titulo?: string): string {
  return `Hola, ${titulo} ${nombre}`;
}


console.log(saludar("javier"))