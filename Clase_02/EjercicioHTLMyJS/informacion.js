var nombre;
var edad;
function Enviar() {
    nombre = document.getElementById("nombreTxt").value;
    edad = document.getElementById("edadTxt").value;
    var info = nombre + " - " + edad;
    document.getElementById("txtInformacion").value = info;
}
