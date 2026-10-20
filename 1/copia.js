// asignacion por valor en datos nativos
let a = 10;
let b = a;
b = 99;
console.log({a}); 
console.log({b});
 
// asignacion es por referencia
const user = { nombre: "Ana" };
const user2 = user;
user2.nombre = "Luis";
console.log(user.nombre); // "Luis", ¡cambió el original!
