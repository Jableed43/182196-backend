// PASO 1 - partes.ts
//
// Las piezas mas simples del sistema y los valores que el dominio acepta.
//
// 1) Los dos conjuntos CERRADOS de valores: los combustibles posibles
//    (uno de ellos es la bateria) y los tipos de rueda.
//    Pensa que estructura de TypeScript evita que alguien escriba "Vateria".
//
// 2) El chasis, que solo sabe de que color es. Nadie debe poder cambiarle
//    el color por asignacion directa: tiene que pasar por un metodo.
//    Aprovecha ese metodo para avisar por consola el cambio.
//
// 3) Las ruedas, que saben su rodado y su tipo. Mismo criterio que el chasis.
//
// Recorda: los otros archivos van a necesitar todo esto.
