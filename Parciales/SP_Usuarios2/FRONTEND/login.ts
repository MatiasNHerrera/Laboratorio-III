/// <reference path="../librerias/jquery/index.d.ts" />

$(document).ready(function(){

    if(localStorage.getItem("usuarios") == null)
    {
        let arrUsuarios = [{
            "correo": "matias@gmail.com",
            "clave": "1234",
            "nombre": "matias",
            "apellido": "herrera",
            "legajo": "1",
            "perfil": "invitado",
            "foto": "1.jpg"
        },
        {
            "correo": "tomas@gmail.com",
            "clave": "4567",
            "nombre": "Tomas",
            "apellido": "Rosas",
            "legajo": "2",
            "perfil": "admin",
            "foto": "2.jpg"
        },
        {
            "correo": "esteban@gmail.com",
            "clave": "78910",
            "nombre": "esteban",
            "apellido": "hernandez",
            "legajo": "3",
            "perfil": "superadmin",
            "foto": "3.jpg"
        },
        {
            "correo": "carlos@gmail.com",
            "clave": "11111",
            "nombre": "Carlos",
            "apellido": "Herrera",
            "legajo": "4",
            "perfil": "invitado",
            "foto": "4.jpg"
        },
        {
            "correo": "patricia@gmail.com",
            "clave": "2222",
            "nombre": "Patricia",
            "apellido": "Abalde",
            "legajo": "5",
            "perfil": "admin",
            "foto": "5.png"
        }];

        localStorage.setItem("usuarios", JSON.stringify(arrUsuarios));
    }
    else
    {
        console.log("Ya estan seteados los usuarios");
    }

});

function VerificarCorreoClave()
{
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let email = $("#mailText").val();
    let clave = $("#claveText").val();
    let validacion = false;

    for(let datos of usuarios)
    {
        if(datos.clave == clave && datos.correo == email)
        {
            window.location.href = './principal.html';
        }
    }

    if(!validacion){
        $("#alertText").html("Error, no se encuentra registrado");
        $(".alert").show();
    }
}