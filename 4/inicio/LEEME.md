# Clase 04 — Aplicación Práctica de TypeScript

Sistema de administración de un concesionario. A diferencia de las clases
anteriores, esto **no son archivos sueltos: es un proyecto con módulos**, donde
cada archivo importa a los otros.

## Arrancar

```bash
npm install
```

## Correr el sistema

```bash
npm start      # equivale a: npx tsx index.ts
```

## Chequear los tipos

```bash
npm run check
```

## El orden importa

Se hace **en orden**, un archivo por paso. Cada uno necesita el anterior:

| Paso | Archivo | Qué aplicás |
| :-- | :--- | :--- |
| 1 | `partes.ts` | enums y encapsulamiento |
| 2 | `interfaces.ts` | la interface `Motor` |
| 3 | `MotorDeCombustion.ts` y `MotorElectrico.ts` | polimorfismo |
| 4 | `Auto.ts` | composición y reglas de negocio |
| 5 | `Concesionario.ts` | agregación y manipulación de arrays |
| 6 | `index.ts` | integración y prueba de la regla |

## Importante: hasta el paso 6 no corre nada

Los archivos se importan entre sí, así que mientras falte una clase vas a ver
errores de `Cannot find name` o de import. **Eso es lo esperado, no está roto.**

Usá `npm run check` como brújula: al empezar marca muchos errores y al terminar
no dice nada.

## Dos cosas que te van a morder

**1. Los imports llevan `.js`, aunque el archivo sea `.ts`.**

```ts
import { Chasis } from "./partes.js";   // ✅
import { Chasis } from "./partes";      // ❌ error TS2835
```

No es un error: el import apunta al archivo **que se va a generar** al compilar.
Ya está escrito así en todos los archivos, no lo toques.

**2. Los métodos de acceso van CON paréntesis.**

```ts
auto.getPatente()    // ✅ el valor
auto.getPatente      // ❌ la función entera, y no da error de compilación
```

En esta clase no usamos los accesores `get`/`set` de TypeScript: usamos métodos
normales.
