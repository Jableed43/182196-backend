function aprobo(nota) {
    if(typeof nota !== "number" || nota < 0){
        return null
    }

    if(nota >= 6){
        return true
    } else {
        return false
    }
}

console.log(aprobo(1))
console.log(aprobo(9))
console.log(aprobo(-2))
console.log(aprobo("hola"))

// If ternario, para decisiones cortas
const nota = 2
const notaUmbral = 6
const resultado = nota >= notaUmbral ? "Aprobado" : "Desaprobado";
console.log(resultado)

// SWITCH
function categoria(nota) {
    switch(nota){
        case 10:
            return "Sobresaliente";
        case 9:
        case 8:
            return "Muy bueno";
        case 7:
        case 6:
            return "Aprobado";
        default:
            return "A recuperar";
    }
}

console.log(categoria(10), categoria(8), categoria(6), categoria(3))
console.log(categoria(15), categoria("hola"))

// Bucles
const notas = [4,7,9,10]
for (let index = 0; index < notas.length; index++) {
    console.log("for", notas[index], aprobo(notas[index]))
}

notas.forEach((nota) => {
    console.log("forEach", nota, aprobo(nota))
})