/// <reference path="../librerias/jquery/index.d.ts" />

$(document).ready(function(){

    let perfil = sessionStorage.getItem('perfil');
    console.log(perfil);

    if(perfil == "admin")
    {
        let listado = JSON.parse(<string>localStorage.getItem('usuarios'));
        let tabla = "<table class='table table-striped table-bordered'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td><td>Acciones</td></tr></thead><tbody>";

        for (let usu of listado) {
            tabla+=`<tr class="warning"><td>${usu.correo}</td><td>${usu.nombre}</td><td>${usu.apellido}</td><td>${usu.perfil}</td><td>${usu.legajo}<td><img src='./backend/fotos/${usu.foto}' height='50px' width='50px'></td>`;
            tabla+=`<td><input type="button" class='btn-danger' value="Eliminar" id="btnBorrar" onclick="EliminarUsuario('${usu.correo}')" data-toggle="modal" data-target="#confirmarEliminar"></td></tr>`;
        }
        tabla+="</tbody></table>";

        $("#listadoDiv").html(tabla);
    }
    else if(perfil == "invitado")
    {
        let listado = JSON.parse(<string>localStorage.getItem('usuarios'));
        let tabla = "<table class='table table-bordered' id='tablaUsuarios'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td></tr></thead><tbody>";

        for (let usu of listado) {
            tabla+=`<tr><td>${usu.correo}</td><td>${usu.nombre}</td><td>${usu.apellido}</td><td>${usu.perfil}</td><td>${usu.legajo}<td><img src='./backend/fotos/${usu.foto}' height='50px' width='50px' class='foto'></td>`;
            tabla+=`</tr>`;
        }
        tabla+="</tbody></table>";

        $("#listadoDiv").html(tabla);
        $("#controles").prop("hidden", false);
        $("#btnGuardarCambios").click(function(){
            GuardarCambios();
        })
        CambiarAspecto();
    }
    else
    {
        let listado = JSON.parse(<string>localStorage.getItem('usuarios'));
        let tabla = "<table class='table table-striped table-bordered'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td><td>Eliminar</td><td>Modificar</td></tr></thead><tbody>";

        for (let usu of listado) {
            tabla+=`<tr class="warning"><td>${usu.correo}</td><td>${usu.nombre}</td><td>${usu.apellido}</td><td>${usu.perfil}</td><td>${usu.legajo}<td><img src='./backend/fotos/${usu.foto}' height='50px' width='50px'></td>`;
            tabla+=`<td><input type="button" class='btn-danger' value="Eliminar" id="btnBorrar" onclick="EliminarUsuario('${usu.correo}')" data-toggle="modal" data-target="#confirmarEliminar"></td>`;
            tabla+=`<td><input type="button" class='btn-warning' value="Modificar" id="btnModificar" onclick="ModificarUsuario('${usu.correo}')"></td></tr>`;
        }
        tabla+="</tbody></table>";

        $("#listadoDiv").html(tabla);
    }
});


function EliminarUsuario(correo : string)
{
    $("#modal-btn-si").click(function(){

        let usuarios = JSON.parse(<string>localStorage.getItem('usuarios'));
        let nuevaLista = Array();

        for(let datos of usuarios)
        {
            if(datos.correo == correo)
            {
                console.log("usuario eliminado");
            }
            else
            {
                nuevaLista.push(datos);
            }
        }

        localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
        window.location.href = './principal.html';
    });

}

function GuardarCambios()
{

    let correoLogeado = sessionStorage.getItem("correo");

    let colorFondo = $("#colorFondo").val();
    let colorFuente = $("#colorFuente").val();
    let marcoImagen = $("#marcoImagen").val();
    $('.foto').removeClass('img-rounded img-thumbnail img-circle');

    let opciones: any = {
        "fondo": colorFondo,
        "fuente": colorFuente,
        "estilo": marcoImagen
    };

    localStorage.setItem("opciones" + correoLogeado, JSON.stringify(opciones));

    CambiarAspecto();

}

function CambiarAspecto()
{

    let correoLogeado = sessionStorage.getItem("correo");
    let opciones = JSON.parse(<string>localStorage.getItem("opciones"+ correoLogeado));
    let colorFondo = $("#colorFondo").val(opciones.fondo);
    let colorFuente = $("#colorFuente").val(opciones.fuente);
    let marcoImagen = $("#marcoImagen").val(opciones.estilo);

    $(".foto").addClass(`img-${opciones.estilo}`);
    $("#tablaUsuarios").css({"background-color" : opciones.fondo, 'color' : opciones.fuente});

}

function ModificarUsuario(correo : string)
{
    $("#modificacion").modal();
    $("#btnEnviar").click(function(){
        
    let apellido = $("#apellidoText").val();
    let nombre = $("#nombreText").val();
    let legajo = $("#legajoText").val();
    let perfil = $("#perfilText").val();
    let foto = $("#fotoFile").prop('files')[0]
    let clave = $("#claveText").val();

    let usuarios : any = JSON.parse(<string>localStorage.getItem("usuarios"));
    let nuevaLista = Array();
    let formFoto = new FormData();
    formFoto.append("foto", foto);

    for(let datos of usuarios)
    {
        if(datos.correo == correo)
        {
            EliminarUsuario(datos.correo);
        }
        else
        {
            nuevaLista.push(datos);
        }
    }

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
                nuevaLista.push(json);
                localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
                window.location.href = './principal.html';
           }
           else{
               
                console.log("error al subir foto");
           }
       })
    })
}