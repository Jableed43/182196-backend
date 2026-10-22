// Ejercicio: creá tu primer módulo tipado.

// 1) interface Mascota
// TODO: nombre (string), especie (solo "perro" o "gato") y edad opcional

type Especie = "canino" | "felino"

interface Mascota{
    nombre: string;
    especie: Especie;
    edad?: number;
    prioridad: Prioridad;
}

// 2) enum Prioridad
// TODO: Baja = 1, Media = 2, Alta = 3
enum Prioridad {
    BAJA = 1,
    MEDIA = 2,
    ALTA = 3
}
// 3) La función: recibe una Mascota y una Prioridad, devuelve un string
// TODO: mensajeDeAtencion(mascota, prioridad): string
//       - edad es opcional: preguntá antes de usarla
//       - switch sobre la prioridad para armar el texto de urgencia
function mensajeDeAtencion(mascota: Mascota): string {
    const edad = mascota.edad !== undefined ? `${mascota.edad} años` : "edad sin registrar"

    let urgencia: string;
    switch (mascota.prioridad) {
        case Prioridad.ALTA:
            urgencia = "Pasa directo al consultorio"
            break;
        case Prioridad.MEDIA:
            urgencia = "Esperar en sala"
            break;
        case Prioridad.BAJA:
            urgencia = "Puede esperar o le damos turno para otro dia"
            break;
    
        default:
            urgencia = "Esa prioridad no existe"
            break;
    }

    const especie = mascota.especie === "canino" ? "El canino" : "El felino";
    return `${especie} ${mascota.nombre} de ${edad} - prioridad ${mascota.prioridad} : ${urgencia}`
}

// 4) Los datos
// TODO: un array de Mascota con 3 mascotas, una de ellas sin edad
    const mascotas: Mascota[] = [
        { nombre: "Rocco", especie: "canino", edad: 7, prioridad: Prioridad.BAJA },
        { nombre: "Pelusa", especie: "felino", prioridad: Prioridad.ALTA },
        { nombre: "Laika", especie: "canino", edad: 2, prioridad: Prioridad.MEDIA }
    ]


    const resultado = mascotas.map((mascota) => mensajeDeAtencion(mascota))

    console.log(resultado)
// 5) Probá los errores (descomentá de a uno y volvé a comentar)
// const pez: Mascota = { nombre: "Nemo", especie: "pez" };
// const anonima: Mascota = { especie: "gato" };

// 6) Imprimí el mensaje de cada mascota
// TODO: recorré el array con for...of

// 7) Comprobá que los tipos desaparecen
//    npm run build  y abrí dist/07-ejercicio-mascotas.js
//    ¿quedó la interface? ¿quedó el enum?
