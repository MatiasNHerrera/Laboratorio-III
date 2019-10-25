
/// <reference path="./node_modules/@types/jquery/index.d.ts" />

function EnviarDatos() : void
{
    var http = new XMLHttpRequest();

    http.open("POST", "http://localhost/Clase_07/Validacion/");

    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    let correo = (<HTMLInputElement>document.getElementById("txtCorreo")).value;
    let clave = (<HTMLInputElement>document.getElementById("txtClave")).value;
    let json = {"correo" : correo, "clave" : clave };
    http.send("informacion=" + JSON.stringify(json));

    http.onreadystatechange = () =>
    {
        if(http.status == 200 && http.readyState == 4)
        {
            let obj : any = JSON.parse(http.responseText);

            if(obj.existe)
            {
                $("#divMensaje").removeClass("error");
                $("#divMensaje").addClass("valido");
                $("#divMensaje").html(obj.mensaje);
            }
            else
            {
                $("#divMensaje").removeClass("valido");
                $("#divMensaje").addClass("error");
                $("#divMensaje").html(obj.mensaje);
            }
        }
    }

}

function Registrar()
{
    var http = new XMLHttpRequest();
    http.open("POST", "index.php");
    http.setRequestHeader("enctype", "multipart/form-data");
    let form : FormData = new FormData();

    let nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    let apellido = (<HTMLInputElement>document.getElementById("apellido")).value;
    let perfil = (<HTMLInputElement>document.getElementById("perfil")).value;
    let correo = (<HTMLInputElement>document.getElementById("correo")).value;
    let clave = (<HTMLInputElement>document.getElementById("clave")).value;
    let foto : any = (<HTMLInputElement>document.getElementById("foto"));
    let path : any = (<HTMLInputElement>document.getElementById("foto")).value;

    let json = {"nombre" : nombre, "apellido" : apellido, "perfil" : perfil, "correo" : correo, "clave" : clave, "foto" : path};

    form.append("usuario", JSON.stringify(json));
    form.append("foto", foto.files[0]);

    http.send(form);

    http.onreadystatechange = () =>
    {
        if(http.status == 200 && http.readyState == 4)
        {
            alert(http.responseText);
        }
    }

}

