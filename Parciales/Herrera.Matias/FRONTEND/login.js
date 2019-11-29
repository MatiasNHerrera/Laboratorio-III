/// <reference path="../librerias/jquery/index.d.ts" />
function VerificarCorreoClave() {
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var email = $("#mailText").val();
    var clave = $("#claveText").val();
    var form = new FormData();
    form.append("email", email);
    form.append("clave", clave);
    var ajaxFoto = $.ajax({
        type: "POST",
        url: "./BACKEND/",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        dataType: "JSON"
    });
    ajaxFoto.done(function (response) {
        if (response.exito) {
            localStorage.setItem("jwt", response.token);
            window.location.href = './principal.html';
        }
        else {
            $("#alertText").html("Error, no se encuentra registrado");
            $(".alert").show();
        }
    });
}
