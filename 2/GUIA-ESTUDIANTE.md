# Clase 02 · Introducción a TypeScript — guía para estudiantes

Esta guía acompaña el código de la carpeta `inicio/`. Leela mientras resolvés los `// TODO:`.

## Cómo arrancar

```bash
cd inicio
npm install
```

Después, cada archivo se corre con su número:

```bash
npm run 01     # ... hasta npm run 10
npm run check  # chequea los tipos de todos los archivos
```

Al empezar, `npm run check` marca **5 errores**: son los `// TODO:` que tenés que completar. Cuando no diga nada, terminaste.

> Las líneas comentadas que empiezan con código, como `// edad = "treinta y tres";`, **dan error a propósito**. Descomentalas, leé lo que dice el editor, y volvé a comentarlas. Esa es la mitad del aprendizaje de hoy.

---

# La idea de toda la clase, en un minuto

JavaScript revisa los tipos **cuando el código ya está corriendo**. Si algo está mal, te enterás cuando explota — y en el servidor, a veces no explota: simplemente hace lo incorrecto.

```javascript
const precio = "100";          // vino como texto de un formulario
const total = precio * 2;      // 200   ... JS adivina y convierte
const conEnvio = precio + 50;  // "10050"  😱 concatena en vez de sumar
```

Nadie se entera. El pedido se guarda con el total mal.

TypeScript revisa los tipos **mientras escribís**, antes de ejecutar nada. El mismo código no compila: te avisa que `precio` es texto.

Y lo más importante de entender hoy: **TypeScript desaparece antes de ejecutar**. Ni Node ni el navegador saben qué es `: string`. Tu `.ts` se convierte en `.js` (eso se llama **transpilar**) y en ese `.js` ya no hay un solo tipo. Los tipos son para vos y para el editor, no para la máquina.

---

# 1 · Tipos básicos → `01-tipos-basicos.ts`

La anotación va después de los dos puntos:

```typescript
let edad: number = 33;
let nombre: string = "javier";
let activo: boolean = true;
let nombres: string[] = ["juan", "ana"];
```

**No hace falta escribir el tipo siempre.** Si hay un valor inicial, TypeScript lo deduce (*inferencia*):

```typescript
let ciudad = "Rosario";   // ya sabe que es string
```

Escribilo cuando la variable arranca vacía, en los parámetros de funciones, y en lo que viene de afuera. Dejá que lo infiera cuando es obvio.

**Unión de tipos** (`|`): "puede ser esto o esto, nada más".

```typescript
let id: string | number;
let valorMixto: string | null = "hola";
```

---

# 2 · El entorno → `02-entorno.ts`

En clase vamos a crear un proyecto desde cero. Los comandos, en orden:

| Comando | Qué hace |
| :--- | :--- |
| `npm init -y` | crea el `package.json` (la ficha del proyecto) |
| `npm install -D typescript tsx` | instala el compilador. `-D` = solo para desarrollar |
| `npx tsc --init` | crea el `tsconfig.json` (el reglamento) |
| `npx tsc` | transpila: genera los `.js` en `dist/` |
| `node dist/archivo.js` | ejecuta el JavaScript resultante |
| `npx tsx archivo.ts` | transpila y ejecuta de una, sin dejar archivos |
| `npx tsc --noEmit` | solo chequea los tipos |

**`npx`** corre un programa que está dentro de `node_modules`. Sin `npx`, la terminal busca una instalación global, que puede no existir o ser de otra versión.

## La demo que no te podés perder

Después de `npx tsc`, abrí el `.js` que se generó. **Desapareció el `: string`.** Eso es la clase entera en una imagen: los tipos existen solo mientras programás y no cuestan nada en producción.

> Si buscás la palabra de un tipo en el `.js` y la encontrás, mirá bien: los **comentarios** sobreviven al transpilar. Lo que se borra son las anotaciones de tipo.

## Dos errores que te van a aparecer

**`error TS5112: tsconfig.json is present but will not be loaded...`**
Le pasaste el nombre del archivo a `tsc` (`npx tsc hola.ts`). Hacelo sin el nombre: `npx tsc`.

**`error TS2532: Object is possibly 'undefined'` al leer `matriz[1][1]`**
El `tsconfig.json` trae activado `noUncheckedIndexedAccess`. Con eso, `matriz[1]` **no** es `number[]` sino `number[] | undefined`, porque TypeScript no da por hecho que esa fila exista. Se arregla con `?.`:

```typescript
console.log(matriz[1]?.[1]);   // 5
```

No te está molestando: te está avisando que accediste a una posición sin comprobar que está ahí. En el backend, ese descuido es el `Cannot read properties of undefined` más común que vas a ver.

---

# 3 · Objetos, `type` e `interface` → `03-objetos-e-interfaces.ts`

Una **interface** define la **forma** que debe tener un objeto. Se le dice *contrato* porque es de cumplimiento obligatorio:

```typescript
interface Pizza {
  masa: boolean;
  salsa?: boolean;      // el ? la hace OPCIONAL
  condimentar(condimento: string): string;
}
```

Si a un objeto le falta algo obligatorio, no compila — y el error te lista **todo** lo que falta de una.

**TypeScript mira la forma, no el nombre.** Un objeto que tiene las propiedades correctas sirve como `Persona`, aunque nunca hayas declarado que lo es. Se llama *tipado estructural*, o *duck typing*: si camina como pato y suena como pato, es un pato.

## `interface` o `type`: ¿cuál uso?

En la mayoría de los casos son intercambiables.

| | `interface` | `type` |
| :--- | :--- | :--- |
| Objetos | ✅ | ✅ |
| Uniones (`A \| B`) | ❌ | ✅ |
| Reabrirse y sumarle campos | ✅ | ❌ |

**La regla práctica:** ¿necesitás una unión? → `type`. ¿Es una entidad del dominio (Usuario, Producto)? → `interface`. En la duda, cualquiera funciona.

---

# 4 · Uniones, literales y funciones → `04-uniones-y-funciones.ts`

Un **tipo literal** es cuando el tipo **es el valor exacto**, no la categoría:

```typescript
type EstadoDeCarga = "cargando" | "descargado" | "cargado";

let estado: EstadoDeCarga = "cargado";
estado = "cargada";   // ❌ error... y te sugiere: Did you mean "cargado"?
```

Probá ese error. Te corrige el typo **antes** de ejecutar. En JavaScript eso era un bug que descubrías en producción.

En una función se tipan **los parámetros** (lo que entra) y **el retorno** (lo que sale):

```typescript
function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}

function saludar(nombre: string, titulo?: string): string { ... }   // ? = opcional
```

## Estrechar la unión (*narrowing*)

Si algo puede ser de varios tipos, TypeScript te **obliga** a preguntar qué es antes de usarlo:

```typescript
function mostrarId(id: string | number): string {
  if (typeof id === "number") {
    return id.toFixed(0);      // acá adentro ya sabe que es number
  }
  return id.toUpperCase();     // y acá, que es string
}
```

Fijate que el autocompletado cambia dentro de cada rama. Eso es el compilador razonando con vos.

---

# 5 · Enums y tuplas → `05-enums-y-tuplas.ts`

Un **enum** es una lista cerrada de constantes con nombre:

```typescript
enum Prioridad { Baja = 1, Media = 2, Alta = 3 }
```

⚠️ **El enum NO desaparece al transpilar.** A diferencia de los tipos, genera un objeto real en el `.js`, y es *bidireccional*: `Prioridad.Alta` da `3`, y `Prioridad[3]` da `"Alta"`.

Si solo necesitás una lista de valores fijos y livianos, una **unión de literales** suele ser mejor, porque esa sí desaparece:

```typescript
type Nivel = "bajo" | "medio" | "alto";
```

Una **tupla** es un array de longitud fija donde cada posición tiene su tipo:

```typescript
let usuario: [string, number] = ["Juan", 25];
let ubicacion: [number, number] = [-34.6, -58.4];   // [lat, lon]
```

Controla el **orden**: si los das al revés, te marca un error por posición. Las vas a ver en React: `useState` devuelve una tupla.

> **Agujero conocido:** controla la longitud al crear la tupla, pero **no impide `.push()`**. No confíes en ella para garantizar el largo si la vas a mutar.

---

# 6 · `any` vs `unknown` → `06-any-vs-unknown.ts`

## `any` — el comodín

Ponerle `any` a una variable **apaga TypeScript para esa variable**. Volvés a JavaScript puro:

```typescript
let dato: any;
dato = 5;
dato.metodoQueNoExiste();   // ✅ COMPILA... y explota en ejecución
```

Y es **contagioso**: todo lo que toca queda sin revisar. Un `any` mal puesto arriba puede desactivar la seguridad de media aplicación sin que nadie lo note.

## `unknown` — el comodín seguro

Acepta cualquier valor igual que `any`, pero **bloquea toda operación hasta que compruebes el tipo**:

```typescript
let seguro: unknown;
seguro = "cinco";
seguro.toUpperCase();   // ❌ Property 'toUpperCase' does not exist on type 'unknown'

if (typeof seguro === "string") {
  seguro.toUpperCase();  // ✅ acá sí: ya comprobaste que es string
}
```

**La regla:** si no conocés el tipo, `unknown`. Nunca `any` para callar un error.

## `never` — lo imposible

Representa algo que **nunca va a pasar**. Lo ves en el archivo `08`.

---

# 7 · Los tipos de la ausencia → `08-ausencia-y-never.ts`

| Tipo | Qué significa |
| :--- | :--- |
| `void` | la función termina bien, pero **no devuelve nada útil** |
| `undefined` | nunca se le asignó un valor |
| `null` | alguien decidió **explícitamente** que esté vacío |
| `never` | no puede pasar nunca |

`null` y `undefined` **no entran en cualquier tipo**. Esto no compila:

```typescript
let nombre: string = null;   // ❌ Type 'null' is not assignable to type 'string'
```

Eso lo hace `strictNullChecks`, y es probablemente la regla que más errores de producción evita. Para usar un valor que puede faltar, hay que preguntar antes — o usar `??`, que da un reemplazo cuando algo es `null` o `undefined`:

```typescript
const mostrar = (valor: string | null) => valor ?? "(vacío)";
```

## `never`: los dos usos

**1) Una función que nunca llega a devolver** (porque siempre lanza):

```typescript
function fallar(mensaje: string): never {
  throw new Error(mensaje);
}
```

Ojo: eso no es `void`. `void` devuelve "nada"; `never` **no llega** a devolver.

**2) Comprobación exhaustiva de un `switch`** — este es el uso que vale oro:

```typescript
type Figura =
  | { tipo: "circulo"; radio: number }
  | { tipo: "cuadrado"; lado: number };

function area(figura: Figura): number {
  switch (figura.tipo) {
    case "circulo":  return Math.PI * figura.radio ** 2;
    case "cuadrado": return figura.lado ** 2;
    default: {
      const imposible: never = figura;   // si cubriste todo, acá no queda nada
      return fallar(`Figura no contemplada: ${imposible}`);
    }
  }
}
```

**Probalo:** agregale un tercer tipo a `Figura` y **no toques la función**. El error aparece solo, en la línea del `never`:

```
error TS2322: Type '{ tipo: "triangulo"; ... }' is not assignable to type 'never'.
```

Es TypeScript diciéndote *"te olvidaste de un caso"*. Sin el `never`, la función devolvería cualquier cosa en silencio.

---

# 8 · Genéricos `<T>` → `09-genericos.ts`

## El problema

Querés una función que devuelva el primer elemento de una lista.

Con tipado **concreto**, solo sirve para un tipo:

```typescript
function primeroDeStrings(lista: string[]): string | undefined { return lista[0]; }
```

Para números, hay que duplicarla. Para usuarios, otra más.

Con **`any`** es una sola función, pero perdiste todo: el resultado es `any`, no autocompleta nada y te deja hacer cualquier barbaridad.

## La solución

`<T>` es una **variable de tipo**: un hueco que se rellena en cada llamada.

```typescript
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const letra = primero(["a", "b"]);    // string | undefined
const numero = primero([10, 20]);     // number | undefined
```

No hace falta escribir el tipo al llamarla: se deduce del argumento.

> **La diferencia con `any`, en el editor:** pasale el mouse a `letra` y verás `string | undefined`, con autocompletado de métodos de string. Con `any` verías `any` y nada más. **Una sola función, y la seguridad intacta.** Eso es un genérico.

## El caso típico de backend

```typescript
interface Respuesta<T> {
  ok: boolean;
  datos: T;
}

function responder<T>(datos: T): Respuesta<T> {
  return { ok: true, datos };
}
```

La misma función sirve para cualquier cosa y el tipo de `datos` se conserva.

## Limitar el genérico con `extends`

"`T` puede ser cualquier cosa, **siempre que** tenga un `id`":

```typescript
function buscarPorId<T extends { id: number }>(lista: T[], id: number): T | undefined {
  return lista.find((item) => item.id === id);
}
```

> Ya venías usando genéricos sin saberlo: `Array<string>`, `Map<number, Usuario>`, `Promise<Usuario>`.

---

# 9 · `"strict": true` → `10-strict-y-validacion.ts`

Es **un** interruptor del `tsconfig.json` que enciende varias reglas de golpe. Activalo desde el primer día: es mucho más fácil empezar estricto que agregar seguridad después.

| Regla | Qué te obliga a hacer |
| :--- | :--- |
| `strictNullChecks` | manejar `null` y `undefined` explícitamente, en vez de que entren en cualquier tipo |
| `noImplicitAny` | tipar lo que TypeScript no puede inferir, en vez de que quede `any` sin que lo pidas |
| `strictPropertyInitialization` | inicializar las propiedades de una clase (en el constructor o con un valor) |
| `useUnknownInCatchVariables` | comprobar el error de un `catch` antes de leerlo: llega como `unknown`, no `any` |
| `strictFunctionTypes` · `strictBindCallApply` | respetar los tipos de los parámetros en callbacks y en `.call()` / `.bind()` |

La de `catch` sorprende al principio:

```typescript
try {
  ...
} catch (error) {
  console.log(error.message);   // ❌ 'error' is of type 'unknown'

  if (error instanceof Error) {
    console.log(error.message);  // ✅
  }
}
```

Y tiene todo el sentido: en JavaScript se puede lanzar **cualquier cosa**, no solo un `Error`. El archivo `10` tiene un ejemplo que lanza un string suelto para que lo veas.

---

# 10 · El límite de TypeScript: no valida en ejecución ⚠️

**Esto es lo más importante de la clase.** Si te llevás una sola cosa, que sea esto.

TypeScript comprueba tipos **solo en tiempo de compilación**. En ejecución no queda nada de él. Entonces, con lo que viene de afuera, **te cree ciegamente**:

```typescript
interface UsuarioNuevo { nombre: string; email: string; edad: number; }

// Lo que llegó de la API: edad vino como TEXTO
const json = '{ "nombre": "Ana", "email": "ana@mail.com", "edad": "treinta" }';

const usuario = JSON.parse(json) as UsuarioNuevo;   // ⚠️ la línea peligrosa
```

Esto compila perfecto. Y en ejecución:

```
edad declarada como number: treinta
typeof real en ejecución:   string
edad + 1 =                  treinta1
```

El `as` **no convierte ni comprueba nada**: es una promesa que le hacés al compilador. Si le mentís, se rompe en ejecución y TypeScript no tuvo la culpa.

## La solución

Validar **en ejecución**. A mano se puede (está en el archivo `10`), pero para 20 campos es insostenible. Para eso existen las librerías de validación: **Zod**, **Yup**, **Joi**.

Con Zod se escribe una sola vez y sirve para las dos cosas — valida en ejecución **y** te da el tipo de TypeScript gratis:

```typescript
const UsuarioSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  edad: z.number().int().positive(),
});

type UsuarioNuevo = z.infer<typeof UsuarioSchema>;   // ⭐ el tipo sale del schema

const resultado = UsuarioSchema.safeParse(JSON.parse(json));
if (!resultado.success) { /* 400 Bad Request */ }
```

(No está instalada en este proyecto; la vas a usar en las clases de Express.)

### La regla para llevarse

> **Lo que escribís vos → TypeScript lo controla.**
> **Lo que viene de afuera → TypeScript NO lo controla. Validalo.**

Y "afuera" es: APIs, formularios, `req.body`, `req.params`, archivos, `process.env` y la base de datos.

---

# Ejercicio de clase → `07-ejercicio-mascotas.ts`

Junta todo en un archivo: interface + tipo literal + propiedad opcional + enum + función tipada.

1. Un `enum Prioridad` (Baja, Media, Alta).
2. Una `interface Mascota` con `nombre`, `especie` (solo `"perro"` o `"gato"`), `edad` **opcional** y `prioridad`.
3. Una función `mensajeDeAtencion(mascota, prioridad): string`.
4. Un array de 3 mascotas, una de cada prioridad y una sin edad.
5. Probá los errores: `especie: "pez"` y una mascota sin `nombre`.
6. Imprimí el mensaje de cada una con `map()`.
7. `npm run build` y abrí el `.js`: ¿quedó la interface? ¿quedó el enum?

## Sobre el `map`

`map` recorre y **devuelve un array nuevo**. Lo interesante es el tipo: entra `Mascota[]` y sale `string[]`, y el editor lo infiere solo.

```typescript
const mensajes = mascotas.map((mascota) => mensajeDeAtencion(mascota, mascota.prioridad));
console.log(mensajes.join("\n"));
```

**Cuándo cada uno:** `map` si querés **obtener** otra lista; `for...of` si solo querés **hacer** algo en cada vuelta (imprimir, guardar). El error típico es usar `map` solo para imprimir: ahí el resultado es `void[]`, un array de nada que nadie usa.

---

# Resumen para repasar

1. TypeScript revisa **en compilación** y **desaparece** al transpilar.
2. `"strict": true` desde el día uno.
3. Dejá que infiera lo obvio; tipá parámetros, retornos y lo que viene de afuera.
4. `type` para uniones, `interface` para entidades. En la duda, cualquiera.
5. Nunca `any` para callar un error: usá `unknown` y comprobá.
6. El enum genera código real; la unión de literales no.
7. `never` en el `default` de un `switch` = el compilador te avisa si olvidás un caso.
8. `<T>` cuando la misma lógica sirve para varios tipos y querés conservar la seguridad.
9. **TypeScript no valida datos en ejecución.** Lo externo se valida aparte.

## Tarea con IA

> "Actuá como un profesor senior. Explicame la diferencia entre `any` y `unknown` en TypeScript con un ejemplo donde `any` deja pasar un error que `unknown` habría atrapado."

## Documentación oficial

TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
