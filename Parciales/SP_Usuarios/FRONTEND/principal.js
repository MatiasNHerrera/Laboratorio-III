/// <reference path="../librerias/jquery/index.d.ts" />
$(document).ready(function () {
    var perfil = sessionStorage.getItem('perfil');
    console.log(perfil);
    if (perfil == "admin") {
        var listado = JSON.parse(localStorage.getItem('usuarios'));
        var tabla = "<table class='table table-striped table-bordered'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td><td>Acciones</td></tr></thead><tbody>";
        for (var _i = 0, listado_1 = listado; _i < listado_1.length; _i++) {
            var usu = listado_1[_i];
            tabla += "<tr class=\"warning\"><td>" + usu.correo + "</td><td>" + usu.nombre + "</td><td>" + usu.apellido + "</td><td>" + usu.perfil + "</td><td>" + usu.legajo + "<td><img src='./backend/fotos/" + usu.foto + "' height='50px' width='50px'></td>";
            tabla += "<td><input type=\"button\" class='btn-danger' value=\"Eliminar\" id=\"btnBorrar\" onclick=\"EliminarUsuario('" + usu.correo + "')\" data-toggle=\"modal\" data-target=\"#confirmarEliminar\"></td></tr>";
        }
        tabla += "</tbody></table>";
        $("#listadoDiv").html(tabla);
    }
    else if (perfil == "invitado") {
        var listado = JSON.parse(localStorage.getItem('usuarios'));
        var tabla = "<table class='table table-bordered' id='tablaUsuarios'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td></tr></thead><tbody>";
        for (var _a = 0, listado_2 = listado; _a < listado_2.length; _a++) {
            var usu = listado_2[_a];
            tabla += "<tr><td>" + usu.correo + "</td><td>" + usu.nombre + "</td><td>" + usu.apellido + "</td><td>" + usu.perfil + "</td><td>" + usu.legajo + "<td><img src='./backend/fotos/" + usu.foto + "' height='50px' width='50px' class='foto'></td>";
            tabla += "</tr>";
        }
        tabla += "</tbody></table>";
        $("#listadoDiv").html(tabla);
        $("#controles").prop("hidden", false);
        $("#btnGuardarCambios").click(function () {
            GuardarCambios();
        });
        CambiarAspecto();
    }
    else {
        var listado = JSON.parse(localStorage.getItem('usuarios'));
        var tabla = "<table class='table table-striped table-bordered'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td><td>Eliminar</td><td>Modificar</td></tr></thead><tbody>";
        for (var _b = 0, listado_3 = listado; _b < listado_3.length; _b++) {
            var usu = listado_3[_b];
            tabla += "<tr class=\"warning\"><td>" + usu.correo + "</td><td>" + usu.nombre + "</td><td>" + usu.apellido + "</td><td>" + usu.perfil + "</td><td>" + usu.legajo + "<td><img src='./backend/fotos/" + usu.foto + "' height='50px' width='50px'></td>";
            tabla += "<td><input type=\"button\" class='btn-danger' value=\"Eliminar\" id=\"btnBorrar\" onclick=\"EliminarUsuario('" + usu.correo + "')\" data-toggle=\"modal\" data-target=\"#confirmarEliminar\"></td>";
            tabla += "<td><input type=\"button\" class='btn-warning' value=\"Modificar\" id=\"btnModificar\" onclick=\"ModificarUsuario('" + usu.correo + "')\"></td></tr>";
        }
        tabla += "</tbody></table>";
        $("#listadoDiv").html(tabla);
    }
});
function EliminarUsuario(correo) {
    $("#modal-btn-si").click(function () {
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));
        var nuevaLista = Array();
        for (var _i = 0, usuarios_1 = usuarios; _i < usuarios_1.length; _i++) {
            var datos = usuarios_1[_i];
            if (datos.correo == correo) {
                console.log("usuario eliminado");
            }
            else {
                nuevaLista.push(datos);
            }
        }
        localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
        window.location.href = './principal.html';
    });
}
function GuardarCambios() {
    var correoLogeado = sessionStorage.getItem("correo");
    var colorFondo = $("#colorFondo").val();
    var colorFuente = $("#colorFuente").val();
    var marcoImagen = $("#marcoImagen").val();
    $('.foto').removeClass('img-rounded img-thumbnail img-circle');
    var opciones = {
        "fondo": colorFondo,
        "fuente": colorFuente,
        "estilo": marcoImagen
    };
    localStorage.setItem("opciones" + correoLogeado, JSON.stringify(opciones));
    CambiarAspecto();
}
function CambiarAspecto() {
    var correoLogeado = sessionStorage.getItem("correo");
    var opciones = JSON.parse(localStorage.getItem("opciones" + correoLogeado));
    var colorFondo = $("#colorFondo").val(opciones.fondo);
    var colorFuente = $("#colorFuente").val(opciones.fuente);
    var marcoImagen = $("#marcoImagen").val(opciones.estilo);
    $(".foto").addClass("img-" + opciones.estilo);
    $("#tablaUsuarios").css({ "background-color": opciones.fondo, 'color': opciones.fuente });
}
function ModificarUsuario(correo) {
    $("#modificacion").modal();
    $("#btnEnviar").click(function () {
        var apellido = $("#apellidoText").val();
        var nombre = $("#nombreText").val();
        var legajo = $("#legajoText").val();
        var perfil = $("#perfilText").val();
        var foto = $("#fotoFile").prop('files')[0];
        var clave = $("#claveText").val();
        var usuarios = JSON.parse(localStorage.getItem("usuarios"));
        var nuevaLista = Array();
        var formFoto = new FormData();
        formFoto.append("foto", foto);
        for (var _i = 0, usuarios_2 = usuarios; _i < usuarios_2.length; _i++) {
            var datos = usuarios_2[_i];
            if (datos.correo == correo) {
                EliminarUsuario(datos.correo);
            }
            else {
                nuevaLista.push(datos);
            }
        }
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
                nuevaLista.push(json);
                localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
                window.location.href = './principal.html';
            }
            else {
                console.log("error al subir foto");
            }
        });
    });
}
