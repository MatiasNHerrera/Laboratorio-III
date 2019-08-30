let nombre : string;
let edad : string;

function Enviar() : void
{
nombre = (<HTMLInputElement> document.getElementById("nombreTxt")).value;
edad = (<HTMLInputElement> document.getElementById("edadTxt")).value;

let info : string = nombre + " - " + edad;

(<HTMLInputElement> document.getElementById("txtInformacion")).value = info;
}