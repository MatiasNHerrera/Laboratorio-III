/// <reference path="./node_modules/@types/jquery/index.d.ts" />
function EnviarDatos() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost/Clase_07/Validacion/");
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    var json = { "correo": correo, "clave": clave };
    http.send("informacion=" + JSON.stringify(json));
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            var obj = JSON.parse(http.responseText);
            if (obj.existe) {
                $("#divMensaje").removeClass("error");
                $("#divMensaje").addClass("valido");
                $("#divMensaje").html(obj.mensaje);
            }
            else {
                $("#divMensaje").removeClass("valido");
                $("#divMensaje").addClass("error");
                $("#divMensaje").html(obj.mensaje);
            }
        }
    };
}
function Registrar() {
    var http = new XMLHttpRequest();
    http.open("POST", "index.php");
    http.setRequestHeader("enctype", "multipart/form-data");
    var form = new FormData();
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var perfil = document.getElementById("perfil").value;
    var correo = document.getElementById("correo").value;
    var clave = document.getElementById("clave").value;
    var foto = document.getElementById("foto");
    var path = document.getElementById("foto").value;
    var json = { "nombre": nombre, "apellido": apellido, "perfil": perfil, "correo": correo, "clave": clave, "foto": path };
    form.append("usuario", JSON.stringify(json));
    form.append("foto", foto.files[0]);
    http.send(form);
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            alert(http.responseText);
        }
    };
}
