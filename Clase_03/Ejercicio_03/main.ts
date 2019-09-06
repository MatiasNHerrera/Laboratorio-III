///<reference path="empleado.ts"/>

var empleado1 = new espacio.Empleado("Matias", "Herrera", 42038513, "Masculino", 0, 25000);
var empleado2 = new espacio.Empleado("Tomi", "Corneta", 42043134, "Masculino", 1, 25000);

console.log("hola");
console.log(empleado1.ToString());
console.log(empleado2.ToString());
console.log(empleado1.Hablar("Español"));