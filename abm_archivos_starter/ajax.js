function Mostrar() {
    var http = new XMLHttpRequest();
    http.open("POST", "administracion.php", true);
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    http.send("queHago=mostrarGrilla");
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            document.getElementById("divGrilla").innerHTML = http.responseText;
        }
    };
}
function Validar() {
    var http = new XMLHttpRequest();
    var retorno = false;
    var respuesta = http.responseText;
    if (respuesta = "ok") {
        retorno = true;
    }
    return retorno;
}
window.onload = function () {
    if (Validar()) {
        Mostrar();
    }
};
