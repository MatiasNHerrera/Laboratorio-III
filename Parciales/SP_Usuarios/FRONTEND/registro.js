/// <reference path="../librerias/jquery/index.d.ts" />
function Registrar() {
    var apellido = $("#apellidoText").val();
    var nombre = $("#nombreText").val();
    var correo = $("#mailText").val();
    var legajo = $("#legajoText").val();
    var perfil = $("#perfilText").val();
    var foto = $("#fotoFile").prop('files')[0];
    var clave = $("#claveText").val();
    var confirmacion = $("#claveDuplicadaText").val();
    var flag = false;
    var formFoto = new FormData();
    formFoto.append("foto", foto);
    var usuarios = Array();
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for (var _i = 0, usuarios_1 = usuarios; _i < usuarios_1.length; _i++) {
        var datos = usuarios_1[_i];
        if (datos.correo == correo) {
            flag = true;
            break;
        }
    }
    if (flag) {
        $("#alertText").html("Se encuentra registrado");
        $(".alert").show();
    }
    else {
        var ajaxFoto = $.ajax({
            type: "POST",
            url: "./BACKEND/guardaFoto.php",
            cache: false,
            contentType: false,
            processData: false,
            data: formFoto,
            dataType: "JSON"
        });
        ajaxFoto.done(function (response) {
            if (response.ok) {
                var json = { "correo": correo, "clave": clave, "nombre": nombre, "apellido": apellido, "legajo": legajo, "perfil": perfil, "foto": foto.name };
                usuarios.push(json);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }
            else {
                console.log("error al subir foto");
            }
        });
        window.location.href = './login.html';
    }
}
