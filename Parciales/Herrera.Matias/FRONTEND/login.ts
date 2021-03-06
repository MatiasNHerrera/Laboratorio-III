/// <reference path="../librerias/jquery/index.d.ts" />

function VerificarCorreoClave()
{
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let email = <string>$("#mailText").val();
    let clave = <string>$("#claveText").val();
    let form = new FormData();
    form.append("email", email);
    form.append("clave", clave);

    let ajaxFoto = $.ajax({
        type: "POST",
        url: "./BACKEND/",
        cache: false,
        contentType: false,
        processData : false,
        data: form,
        dataType: "JSON"
       })

       ajaxFoto.done(function(response){

           if(response.exito){

               localStorage.setItem("jwt", response.token);
               window.location.href = './principal.html';
           }
           else{

                $("#alertText").html("Error, no se encuentra registrado");
                $(".alert").show();
           }
       })

}
