// new hace 4 cosas: crea el objeto, lo enlaza con la clase,
// ejecuta el constructor con this apuntando a él, y lo devuelve.

class Producto {
  nombre: string;
  precio: number;
  stock: number;

  constructor(nombre: string, precio: number, stock: number) {
    // TODO: agregá console.log({ ...this }) antes y después de asignar,
    //       para ver el objeto llenándose
    console.log("  [constructor] this al entrar:", { ...this });
    this.nombre = nombre;
    console.log("  [constructor] this despues de nombre:", { ...this });
    this.precio = precio;
    this.stock = stock;
    console.log("  [constructor] this al salir:", { ...this });
  }

  valorEnStock(): number {
    return this.precio * this.stock;
  }

  // TODO: resumen(): string -> "quedan N unidades de X a $Y"
  resumen(): string {
    return `quedan ${this.stock} unidades de ${this.nombre} a $${this.precio}`;
  }
}

const teclado = new Producto("Teclado", 25000, 4);
console.log("valor en stock:", teclado.valorEnStock());

// TODO: creá otro Producto invirtiendo precio y stock.
//       ¿Avisa el compilador? Mostralo con resumen()
const malArmado = new Producto("Mouse", 2, 18000);

// Atajo: parameter properties.
// TODO: ProductoCorto, la misma clase pero con public en el constructor
class ProductoCorto {
  constructor(
    public nombre: string,
    public precio: number,
    public stock: number,
  ) {}

  valorEnStock(): number {
    return this.precio * this.stock;
  }
}

const monitor = new ProductoCorto("Monitor", 180000, 2)
console.log({monitor})


// TODO: una clase Pedido con un id readonly.
//       Después probá reasignarlo y leé el error

class Pedido {
  constructor(
    public readonly id: string,
    public total: number,
  ) {}
}

const pedido = new Pedido("PED-001", 5000)
pedido.total = 7000;
// pedido.id = "PED-002;"

// El constructor no se llama a mano. Acá TypeScript NO te frena:
try {
  teclado.constructor("otro", 1, 1);
} catch (error) {
  console.log("a mano:", (error as Error).message);
}
