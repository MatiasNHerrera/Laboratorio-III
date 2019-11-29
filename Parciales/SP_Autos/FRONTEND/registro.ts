/// <reference path="../librerias/jquery/index.d.ts" />

function CargarDatos()
{
    
        let apellido = $("#apellido").val();
        let nombre = $("#nombre").val();
        let correo = $("#email2").val();
        let perfil = $("#perfil").val();
        let foto = $("#foto").prop('files')[0]
        let clave = $("#clave2").val();
        let confirmacion = $("#claveDuplicadaText").val();
        let flag = false;
        let formFoto = new FormData();
        let json = {"correo" : correo,"clave" : clave, "nombre" : nombre, "apellido" : apellido, "perfil" : perfil, "foto" : foto.name}

        formFoto.append("foto", foto);
        formFoto.append("json", JSON.stringify(json));

        let ajaxFoto = $.ajax({

            type: "POST",
            url: "./BACKEND/registro",
            cache: false,
            contentType: false,
            processData : false,
            data: formFoto,
            dataType: "JSON"

        })

            ajaxFoto.done(function(response){

                if(response.exito){

                    $("#myModal .close").click();
                }
                else{
                    
                    $("#errorRegistro").html("Error, ya se encuentra en la base de datos");
                    $(".alert").show();
                }
            })

      
}
