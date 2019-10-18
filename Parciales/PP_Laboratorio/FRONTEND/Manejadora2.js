var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Mascota = /** @class */ (function () {
        function Mascota(tamanio, edad, precio) {
            this.tamanio = tamanio;
            this.edad = edad;
            this.precio = precio;
        }
        Mascota.prototype.ToString = function () {
            return "\"tamanio\" : \"" + this.tamanio + "\", \"edad\" : \"" + this.edad + "\", \"precio\" : \"" + this.precio + "\"";
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
///<reference path="Mascota.ts"/>
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(nombre, raza, pathFoto, tamanio, edad, precio) {
            var _this = _super.call(this, tamanio, edad, precio) || this;
            _this.nombre = nombre;
            _this.raza = raza;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Perro.prototype.toJSON = function () {
            var datos = "{\"nombre\" : \"" + this.nombre + "\", \"raza\" : \"" + this.raza + "\", \"pathFoto\" : \"" + this.pathFoto + "\", " + _super.prototype.ToString.call(this) + "}";
            return JSON.parse(datos);
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="Perro.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarPerroJSON = function () {
            var tamanio = document.getElementById("tamaño").value;
            var edad = document.getElementById("edad").value;
            var precio = document.getElementById("precio").value;
            var nombre = document.getElementById("nombre").value;
            var raza = document.getElementById("raza").value;
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathModificado = (path.split('\\'))[2];
            var perrito = new Entidades.Perro(nombre, raza, pathModificado, tamanio, parseInt(edad), parseInt(precio));
            var form = new FormData();
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(perrito.toJSON()));
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/agregar_json.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                if (respuesta.Ok) {
                    alert("se ha guardado el perro");
                }
                else {
                    alert("no se ha podido guardar el perro");
                }
            });
            ajax.fail(function () {
                alert("error al entregar los datos");
            });
        };
        Manejadora.MostrarPerrosJSON = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/traer_json.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                var lista = respuesta;
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<tr>";
                tabla += "<td>NOMBRE</td>";
                tabla += "<td>RAZA</td>";
                tabla += "<td>TAMAÑO</td>";
                tabla += "<td>EDAD</td>";
                tabla += "<td>PRECIO</td>";
                tabla += "<td>FOTO</td>";
                tabla += "</tr>";
                console.log(lista);
                lista.forEach(function (elemento) {
                    tabla += "<tr>";
                    tabla += "<td>" + elemento.nombre + "</td>";
                    tabla += "<td>" + elemento.raza + "</td>";
                    tabla += "<td>" + elemento.tamanio + "</td>";
                    tabla += "<td>" + elemento.edad + "</td>";
                    tabla += "<td>" + elemento.precio + "</td>";
                    tabla += "<td><img src=../BACKEND/fotos/" + elemento.pathFoto + " width='50px'></td>";
                });
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.AgregarPerroEnBaseDeDatos = function () {
            var tamanio = document.getElementById("tamaño").value;
            var edad = document.getElementById("edad").value;
            var precio = document.getElementById("precio").value;
            var nombre = document.getElementById("nombre").value;
            var raza = document.getElementById("raza").value;
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathModificado = (path.split('\\'))[2];
            var perrito = new Entidades.Perro(nombre, raza, pathModificado, tamanio, parseInt(edad), parseInt(precio));
            var form = new FormData();
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(perrito.toJSON()));
            if (localStorage.getItem("modificar") == "false") {
                var valor = $("#btnAgregarBd").val();
                if (valor == "Agregar en BD") {
                    var ajax = $.ajax({
                        type: "POST",
                        url: "../BACKEND/agregar_bd.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form,
                        dataType: "JSON"
                    });
                    ajax.done(function (respuesta) {
                        if (respuesta.Ok) {
                            alert("Se ha agregado de forma correcta a la base de datos");
                            Manejadora.MostrarPerrosBaseDeDatos();
                        }
                        else {
                            alert("No se ha podido agregar a la base de datos");
                        }
                    });
                }
                else {
                    var ajax = $.ajax({
                        type: "POST",
                        url: "../BACKEND/modificar_bd.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form,
                        dataType: "JSON"
                    });
                    ajax.done(function (respuesta) {
                        if (respuesta.Ok) {
                            $("#btnAgregarBd").val("Agregar en BD");
                            $("#nombre").prop("disabled", false);
                            alert("Se ha modificado de forma correcta a la base de datos");
                            Manejadora.MostrarPerrosBaseDeDatos();
                        }
                        else {
                            alert("No se ha podido modificar a la base de datos");
                            console.log("No se ha podido modificar en la base de datos");
                        }
                    });
                }
            }
            else {
                $("#btnAgregarBd").val("Modificar en BD");
                localStorage.setItem("modificar", "false");
            }
        };
        Manejadora.VerificarExistencia = function () {
            var edad = document.getElementById("edad").value;
            var raza = document.getElementById("raza").value;
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                var validacion = false;
                for (var _i = 0, respuesta_1 = respuesta; _i < respuesta_1.length; _i++) {
                    var i = respuesta_1[_i];
                    if (i.edad == edad && i.raza == raza) {
                        alert("Existe en la base de datos, no se agregara");
                        validacion = true;
                        return;
                    }
                }
                if (!validacion) {
                    Manejadora.AgregarPerroEnBaseDeDatos();
                }
            });
            ajax.fail(function () {
                alert("no se ha podido enviar datos de forma correcta");
            });
        };
        Manejadora.MostrarPerrosBaseDeDatos = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                var lista = respuesta;
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<tr>";
                tabla += "<td>NOMBRE</td>";
                tabla += "<td>RAZA</td>";
                tabla += "<td>TAMAÑO</td>";
                tabla += "<td>EDAD</td>";
                tabla += "<td>PRECIO</td>";
                tabla += "<td>FOTO</td>";
                tabla += "</tr>";
                console.log(lista);
                lista.forEach(function (elemento) {
                    tabla += "<tr>";
                    tabla += "<td>" + elemento.nombre + "</td>";
                    tabla += "<td>" + elemento.raza + "</td>";
                    tabla += "<td>" + elemento.tamanio + "</td>";
                    tabla += "<td>" + elemento.edad + "</td>";
                    tabla += "<td>" + elemento.precio + "</td>";
                    var dividido = elemento.pathFoto.indexOf("MODIFICADA");
                    console.log(dividido);
                    if (dividido != -1) {
                        tabla += "<td><img src=../BACKEND/fotos_modificadas/" + elemento.pathFoto + " width='50px'></td>";
                    }
                    else {
                        tabla += "<td><img src=../BACKEND/fotos/" + elemento.pathFoto + " width='50px'></td>";
                    }
                    tabla += "<td><input type='button' value='Eliminar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().EliminarPerro(" + JSON.stringify(elemento) + ")'>";
                    tabla += '</br>';
                    tabla += "<input type='button' value='Modificar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().ModificarPerro(" + JSON.stringify(elemento) + ")'></td>";
                });
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.prototype.EliminarPerro = function (json) {
            var perro = json;
            var form = new FormData();
            form.append("cadenaJson", JSON.stringify(perro));
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                for (var _i = 0, respuesta_2 = respuesta; _i < respuesta_2.length; _i++) {
                    var i = respuesta_2[_i];
                    if (i.nombre == perro.nombre && i.raza == perro.raza) {
                        if (confirm("Desea eliminar a " + perro.nombre + " de raza " + perro.raza)) {
                            var eliminar = $.ajax({
                                type: "POST",
                                url: "../BACKEND/eliminar_bd.php",
                                cache: false,
                                contentType: false,
                                processData: false,
                                dataType: "JSON",
                                data: form
                            });
                            eliminar.done(function (respuesta) {
                                console.log(respuesta);
                                if (!respuesta.Ok) {
                                    alert("se ha eliminado de forma correcta");
                                    Manejadora.MostrarPerrosBaseDeDatos();
                                }
                                else {
                                    alert("No se ha podido eliminar");
                                }
                            });
                        }
                        return;
                    }
                }
            });
        };
        Manejadora.prototype.ModificarPerro = function (json) {
            $("#tamaño").val(json.tamanio);
            $("#edad").val(json.edad);
            $("#precio").val(json.precio);
            $("#raza").val(json.raza);
            $("#nombre").val(json.nombre);
            $("#nombre").prop("disabled", true);
            localStorage.setItem("modificar", "true");
            Manejadora.AgregarPerroEnBaseDeDatos();
        };
        Manejadora.ObtenerPerrosPorTamaño = function () {
            var chico = 0;
            var mediano = 0;
            var grande = 0;
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                for (var _i = 0, respuesta_3 = respuesta; _i < respuesta_3.length; _i++) {
                    var i = respuesta_3[_i];
                    if (i.tamanio.toLowerCase() == "chico") {
                        chico++;
                    }
                    else if (i.tamanio.toLowerCase() == "mediano") {
                        mediano++;
                    }
                    else {
                        grande++;
                    }
                }
                var max = chico;
                var min = chico;
                var maxTamaño = "chico";
                var minTamaño = "chico";
                if (mediano > max) {
                    max = mediano;
                    maxTamaño = "mediano";
                }
                else if (mediano == max) {
                    maxTamaño += ", mediano";
                }
                if (grande > max) {
                    max = grande;
                    maxTamaño = "grande";
                }
                else if (grande == max) {
                    maxTamaño += ", grande";
                }
                if (mediano < min) {
                    min = mediano;
                    minTamaño = "mediano";
                }
                else if (mediano == min) {
                    minTamaño += ", mediano";
                }
                if (grande < min) {
                    min = grande;
                    minTamaño = "grande";
                }
                else if (grande == min) {
                    minTamaño += ", grande";
                }
                console.log("La mayor cantidad es " + maxTamaño + " con " + max + " perros.");
                console.log("La menor cantidad es " + minTamaño + " con " + min + " perros.");
            });
        };
        Manejadora.prototype.FiltrarPerroPorRaza = function () {
            var raza = $("#raza").val();
            var tabla = "";
            tabla += "<table border=1>";
            tabla += "<tr>";
            tabla += "<td>NOMBRE</td>";
            tabla += "<td>RAZA</td>";
            tabla += "<td>TAMAÑO</td>";
            tabla += "<td>EDAD</td>";
            tabla += "<td>PRECIO</td>";
            tabla += "<td>FOTO</td>";
            tabla += "</tr>";
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            new PrimerParcial.Manejadora().AdministrarSpinner(true);
            ajax.done(function (respuesta) {
                for (var _i = 0, respuesta_4 = respuesta; _i < respuesta_4.length; _i++) {
                    var i = respuesta_4[_i];
                    if (i.raza == raza) {
                        tabla += "<tr>";
                        tabla += "<td>" + i.nombre + "</td>";
                        tabla += "<td>" + i.raza + "</td>";
                        tabla += "<td>" + i.tamanio + "</td>";
                        tabla += "<td>" + i.edad + "</td>";
                        tabla += "<td>" + i.precio + "</td>";
                        var dividido = i.pathFoto.indexOf("MODIFICADA");
                        console.log(dividido);
                        if (dividido != -1) {
                            tabla += "<td><img src=../BACKEND/fotos_modificadas/" + i.pathFoto + " width='50px'></td>";
                        }
                        else {
                            tabla += "<td><img src=../BACKEND/fotos/" + i.pathFoto + " width='50px'></td>";
                        }
                    }
                }
                new PrimerParcial.Manejadora().AdministrarSpinner(false);
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.prototype.CargarRazasJSON = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/cargar_raza.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (respuesta) {
                for (var _i = 0, respuesta_5 = respuesta; _i < respuesta_5.length; _i++) {
                    var i = respuesta_5[_i];
                    $("#raza").append("<option>" + i.descripcion + "</option>");
                }
            });
        };
        Manejadora.prototype.AdministrarSpinner = function (validacion) {
            var mostrar = "";
            if (validacion) {
                mostrar = '<img id="imgSpinner" src="../BACKEND/gif-load.gif" />';
                $("#divTabla").html(mostrar);
            }
            else {
                $("#divTabla").html(" ");
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
