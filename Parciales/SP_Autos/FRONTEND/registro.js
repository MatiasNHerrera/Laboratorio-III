/// <reference path="../librerias/jquery/index.d.ts" />
function CargarDatos() {
    var apellido = $("#apellido").val();
    var nombre = $("#nombre").val();
    var correo = $("#email2").val();
    var perfil = $("#perfil").val();
    var foto = $("#foto").prop('files')[0];
    var clave = $("#clave2").val();
    var confirmacion = $("#claveDuplicadaText").val();
    var flag = false;
    var formFoto = new FormData();
    var json = { "correo": correo, "clave": clave, "nombre": nombre, "apellido": apellido, "perfil": perfil, "foto": foto.name };
    formFoto.append("foto", foto);
    formFoto.append("json", JSON.stringify(json));
    var ajaxFoto = $.ajax({
        type: "POST",
        url: "./BACKEND/registro",
        cache: false,
        contentType: false,
        processData: false,
        data: formFoto,
        dataType: "JSON"
    });
    ajaxFoto.done(function (response) {
        if (response.exito) {
            $("#myModal .close").click();
        }
        else {
            $("#errorRegistro").html("Error, ya se encuentra en la base de datos");
            $(".alert").show();
        }
    });
}
