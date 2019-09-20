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
    http.open("POST", "verificacion.php", true);
    var respuesta = http.responseText;
    if (respuesta == "ok" && respuesta != null) {
        retorno = true;
    }
    return retorno;
}
window.onload = function () {
    if (Validar()) {
        Mostrar();
    }
};
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.AgregarProducto = function () {
        var http = new XMLHttpRequest();
        http.open("POST", "administracion.php", true);
        http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        http.send("queHago=agregar");
        http.onreadystatechange = function () {
            if (http.status == 200 && http.readyState == 4) {
                alert(http.responseText);
            }
        };
    };
    return Main;
}());
