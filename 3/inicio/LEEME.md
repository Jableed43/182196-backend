# Clase 03 — Programación Orientada a Objetos

## Arrancar

```bash
npm install
```

## Correr cada archivo

```bash
npm run 01    # clases, objetos, this y referencias
npm run 02    # el constructor y qué hace new
npm run 03    # herencia: extends y super
npm run 04    # polimorfismo: override
npm run 05    # abstracción: abstract e interface
npm run 06    # ejercicio: sistema de empleados
```

## Chequear los tipos de todo

```bash
npm run check
```

## Importante: acá los archivos NO corren hasta que escribas la clase

En la clase anterior los huecos eran tipos, y los tipos desaparecen al ejecutar,
así que los archivos corrían igual estando incompletos.

Acá es distinto: **una clase sí existe en ejecución**. El primer `// TODO:` de
cada archivo es la clase misma, así que hasta que la escribas vas a ver:

```
ReferenceError: Personaje is not defined
```

**Eso es lo esperado, no está roto.** Escribís la clase y el archivo arranca.

Los únicos dos que corren de entrada son el `02` (la clase viene dada) y el
`06` (es el enunciado del ejercicio).

## Cómo trabajar

- Cada `// TODO:` es algo que escribís vos.
- Donde dice "leé el error", el error es a propósito: provocalo, leelo y seguí.
- `npm run check` al empezar marca 12 errores, todos `Cannot find name`: son
  las clases que faltan. Cuando no diga nada, está todo hecho.
