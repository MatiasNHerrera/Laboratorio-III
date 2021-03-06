/// <reference path="../librerias/jquery/index.d.ts" />

$(document).ready(function(){

    let token = localStorage.getItem("jwt");

    let ajax = $.ajax({
        type: "GET",
        url: "./backend/validacion",
        cache: false,
        contentType: false,
        processData : false,
        dataType: "JSON",
        headers : {
            "token" : token
        }

       });

       ajax.done(function(response){
           if(response.exito){
                GenerarTablaUsuarios(response.perfil);
                GenerarTablaAutos(response.perfil);
            }
           else{
                
                window.location.href = './login.html';
           }
       });
})

function GenerarTablaUsuarios(perfil : string){

   let ajax = $.ajax({
       type: "GET",
       url: "./backend/TablaUsuario",
       cache: false,
       contentType: false,
       processData : false,
       dataType: "JSON",
       headers : {
        "perfil" : perfil
        }
      });
      ajax.done(function(response){
          if(response.ok){
              $('#miDiv').html(response.tabla);
           }
          else{
               console.log("No se pudo generar el listado");
          }
      });
}
function GenerarTablaAutos(perfil : string){

   let ajax = $.ajax({
       type: "GET",
       url: "./backend/TablaAuto",
       cache: false,
       contentType: false,
       processData : false,
       dataType: "JSON",
       headers : {
           "perfil" : perfil
       }
      });
      ajax.done(function(response){
          if(response.ok){
              $('#miDiv2').html(response.tabla);
           }
          else{
               console.log("No se pudo generar el listado");
          }
      });

}


function EliminarUsuario(id : number)
{
    if(confirm("Desea eliminar el usuario?"))
    {
        let ajax = $.ajax({
            type: "GET",
            url: "./BACKEND/eliminarAuto",
            cache: false,
            contentType: false,
            processData : false,
            headers:{
                "id" : id.toString()
            },
            dataType: "JSON"
        })

        ajax.done(function(response){

            if(response.exito)
            {
                console.log("auto eliminado");
                window.location.href = "./principal.html";
            }
            else
            {
                $("#ErrorEliminacion").html("Error al intentar eliminar el usuario");
                $(".alert").show();
            }
        });
    }
}

function ModificarUsuario(id : number)
{
    $("#myModal").show();
}