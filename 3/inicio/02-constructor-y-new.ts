// new hace 4 cosas: crea el objeto, lo enlaza con la clase,
// ejecuta el constructor con this apuntando a él, y lo devuelve.

class Producto {
  nombre: string;
  precio: number;
  stock: number;

  constructor(nombre: string, precio: number, stock: number) {
    // TODO: agregá console.log({ ...this }) antes y después de asignar,
    //       para ver el objeto llenándose
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  valorEnStock(): number {
    return this.precio * this.stock;
  }

  // TODO: resumen(): string -> "quedan N unidades de X a $Y"
}

const teclado = new Producto("Teclado", 25000, 4);
console.log("valor en stock:", teclado.valorEnStock());

// TODO: creá otro Producto invirtiendo precio y stock.
//       ¿Avisa el compilador? Mostralo con resumen()

// Atajo: parameter properties.
// TODO: ProductoCorto, la misma clase pero con public en el constructor

// TODO: una clase Pedido con un id readonly.
//       Después probá reasignarlo y leé el error

// El constructor no se llama a mano. Acá TypeScript NO te frena:
try {
  teclado.constructor("otro", 1, 1);
} catch (error) {
  console.log("a mano:", (error as Error).message);
}
