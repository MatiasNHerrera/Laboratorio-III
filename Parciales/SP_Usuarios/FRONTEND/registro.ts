/// <reference path="../librerias/jquery/index.d.ts" />

function Registrar()
{
    let apellido = $("#apellidoText").val();
    let nombre = $("#nombreText").val();
    let correo = $("#mailText").val();
    let legajo = $("#legajoText").val();
    let perfil = $("#perfilText").val();
    let foto = $("#fotoFile").prop('files')[0]
    let clave = $("#claveText").val();
    let confirmacion = $("#claveDuplicadaText").val();
    let flag = false;
    let formFoto = new FormData();
    formFoto.append("foto", foto);

    let usuarios = Array();
    usuarios = JSON.parse(localStorage.getItem("usuarios"));

    for(let datos of usuarios)
    {
        if(datos.correo == correo)
        {
            flag = true;
            break;
        }
    }

    if(flag)
    {
        $("#alertText").html("Se encuentra registrado");
        $(".alert").show();
    }
    else
    {
        let ajaxFoto = $.ajax({
            type: "POST",
            url: "./BACKEND/guardaFoto.php",
            cache: false,
            contentType: false,
            processData : false,
            data: formFoto,
            dataType: "JSON"
           })

           ajaxFoto.done(function(response){
               if(response.ok){
                    let json = {"correo" : correo,"clave" : clave, "nombre" : nombre, "apellido" : apellido, "legajo" : legajo, "perfil" : perfil, "foto" : foto.name}
                    usuarios.push(json);
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
               }
               else{
                   
                    console.log("error al subir foto");
               }
           })

           window.location.href = './login.html';
    }

}