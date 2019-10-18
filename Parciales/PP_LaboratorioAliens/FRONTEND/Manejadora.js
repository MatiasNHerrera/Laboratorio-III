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
    var Ente = /** @class */ (function () {
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        Ente.prototype.toString = function () {
            return "\"cuadrante\" : \"" + this.cuadrante + "\", \"edad\" : \"" + this.edad + "\", \"altura\" : \"" + this.altura + "\"";
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
///<reference path="Ente.ts"/>
var Entidades;
(function (Entidades) {
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        function Alien(cuadrante, edad, altura, raza, planetaOrigen, pathFoto) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this.raza = raza;
            _this.planetaOrigen = planetaOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Alien.prototype.toJSON = function () {
            var datos = "{" + _super.prototype.toString.call(this) + ",\"raza\":\"" + this.raza + "\",\"planetaOrigen\":\"" + this.planetaOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(datos);
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="Alien.ts"/>
var RecuperatorioPrimerParcial;
(function (RecuperatorioPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function (actualizarStorage) {
            if (actualizarStorage === void 0) { actualizarStorage = false; }
            var cuadrante = document.getElementById("cuadrante").value;
            var edad = document.getElementById("edad").value;
            var altura = document.getElementById("altura").value;
            var planetaOrigen = document.getElementById("cboPlaneta").value;
            var raza = document.getElementById("raza").value;
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathModificado = (path.split('\\'))[2];
            var alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planetaOrigen, pathModificado);
            var form = new FormData();
            form.append("cadenaJson", JSON.stringify(alien.toJSON()));
            form.append("foto", foto.files[0]);
            if (localStorage.getItem("modificar") == "false") {
                var valor = $("#btn-agregar").val();
                if (valor == "Agregar") {
                    form.append("caso", "agregar");
                    var ajax = $.ajax({
                        type: "POST",
                        url: "../BACKEND/administrar.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form,
                        dataType: "JSON"
                    });
                    ajax.done(function (respuesta) {
                        if (respuesta.TodoOK) {
                            alert("Se ha podido guardar");
                            if (actualizarStorage) {
                                Manejadora.GuardarEnLocalStorage();
                            }
                        }
                        else {
                            alert("No se ha podido guardar");
                        }
                    });
                    ajax.fail(function () {
                        alert("Ha ocurrido un error en ajax");
                    });
                }
                else {
                    form.append("caso", "modificar");
                    var ajax = $.ajax({
                        type: "POST",
                        url: "../BACKEND/administrar.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form,
                        dataType: "JSON"
                    });
                    ajax.done(function (respuesta) {
                        if (respuesta.TodoOK) {
                            alert("Se ha podido modificar");
                            $("#btn-agregar").val("Agregar");
                            $("#cuadrante").prop("disabled", false);
                            Manejadora.GuardarEnLocalStorage();
                            Manejadora.MostrarAliens();
                        }
                        else {
                            alert("No se ha podido modificar");
                            console.log("No se ha podido modificar de forma correcta");
                        }
                    });
                }
            }
            else {
                $("#btn-agregar").val("Modificar");
                localStorage.setItem("modificar", "false");
            }
        };
        Manejadora.MostrarAliens = function () {
            var form = new FormData();
            form.append("caso", "traer");
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON",
                data: form
            });
            ajax.done(function (respuesta) {
                console.log(respuesta);
                var lista = respuesta;
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<tr>";
                tabla += "<td>CUADRANTE</td>";
                tabla += "<td>EDAD</td>";
                tabla += "<td>ALTURA</td>";
                tabla += "<td>PLANETA ORIGEN</td>";
                tabla += "<td>RAZA</td>";
                tabla += "<td>FOTO</td>";
                tabla += "</tr>";
                lista.forEach(function (elemento) {
                    tabla += "<tr>";
                    tabla += "<td>" + elemento.cuadrante + "</td>";
                    tabla += "<td>" + elemento.edad + "</td>";
                    tabla += "<td>" + elemento.altura + "</td>";
                    tabla += "<td>" + elemento.planetaOrigen + "</td>";
                    tabla += "<td>" + elemento.raza + "</td>";
                    tabla += "<td><img src=../BACKEND/fotos/" + elemento.pathFoto + " width='50px'></td>";
                    tabla += "<td><input type='button' value='Eliminar' class='btn btn-warning' onclick='new RecuperatorioPrimerParcial.Manejadora().EliminarAlien(" + JSON.stringify(elemento) + ")'>";
                    tabla += '</br>';
                    tabla += "<input type='button' value='Modificar' class='btn btn-warning' onclick='new RecuperatorioPrimerParcial.Manejadora().ModificarAlien(" + JSON.stringify(elemento) + ")'></td>";
                });
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var form = new FormData();
            form.append("caso", "traer");
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON",
                data: form
            });
            ajax.done(function (respuesta) {
                localStorage.setItem("aliens_local_storage", JSON.stringify(respuesta));
                if (localStorage["aliens_local_storage"] != null) {
                    alert("Guardado de forma correcta en local storage");
                }
            });
        };
        Manejadora.VerificarExistencia = function () {
            var cuadrante = $("#cuadrante").val();
            var raza = $("#raza").val();
            var datitos = JSON.parse(localStorage.getItem("aliens_local_storage"));
            var validacion = false;
            for (var _i = 0, datitos_1 = datitos; _i < datitos_1.length; _i++) {
                var i = datitos_1[_i];
                if (i.raza == raza && i.cuadrante == cuadrante) {
                    console.log("Ya se encuentra guardado en local storage");
                    alert("Ya se encuentra guardado en local storage");
                    validacion = true;
                    break;
                }
            }
            if (!validacion) {
                localStorage.setItem("aliens_local_storage", "");
                Manejadora.AgregarAlien(true);
            }
        };
        Manejadora.ObtenerAliensPorCuadrante = function () {
            var aliens = JSON.parse(localStorage.getItem("aliens_local_storage"));
            var contadores = [];
            for (var _i = 0, aliens_1 = aliens; _i < aliens_1.length; _i++) {
                var datos = aliens_1[_i];
                if (contadores[datos.cuadrante] === undefined) {
                    contadores.push(datos.cuadrante);
                    contadores[datos.cuadrante] = 0;
                }
                contadores[datos.cuadrante]++;
            }
            var max = null;
            var min = null;
            for (var _a = 0, contadores_1 = contadores; _a < contadores_1.length; _a++) {
                var datos = contadores_1[_a];
                if (max === null && min === null) {
                    max = contadores[datos];
                    min = contadores[datos];
                }
                break;
            }
            var maxStr = "El/Los cuadrantes con mayor cantidad de aliens es/son: ";
            var minStr = "El/Los cuadrantes con menor cantidad de aliens es/son: ";
            for (var _b = 0, contadores_2 = contadores; _b < contadores_2.length; _b++) {
                var planeta = contadores_2[_b];
                if (contadores[planeta] > max) {
                    max = contadores[planeta];
                }
                else if (contadores[planeta] < min) {
                    min = contadores[planeta];
                }
            }
            for (var _c = 0, contadores_3 = contadores; _c < contadores_3.length; _c++) {
                var planetas = contadores_3[_c];
                if (contadores[planetas] == max) {
                    maxStr += planetas + "\n";
                }
                if (contadores[planetas] == min) {
                    minStr += planetas + "\n";
                }
            }
            console.log(maxStr + " con " + max);
            console.log(minStr + " con " + min);
        };
        Manejadora.prototype.EliminarAlien = function (json) {
            var form = new FormData();
            form.append("caso", "eliminar");
            form.append("cadenaJson", JSON.stringify(json));
            if (confirm("Esta seguro que desea eliminar al cuadrante " + json.cuadrante + " y raza " + json.raza)) {
                var ajax = $.ajax({
                    type: "POST",
                    url: "../BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "JSON",
                    data: form
                });
                ajax.done(function (respuesta) {
                    if (respuesta.TodoOK) {
                        alert("Se ha eliminado con exito");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                    }
                    else {
                        alert("No se ha podido eliminar");
                    }
                });
            }
        };
        Manejadora.prototype.ModificarAlien = function (json) {
            $("#cuadrante").val(json.cuadrante);
            $("#cuadrante").prop("disabled", true);
            $("#edad").val(json.edad);
            $("#altura").val(json.altura);
            $("#raza").val(json.raza);
            $("#planetaOrigen").val(json.planetaOrigen);
            $("#imgFoto").attr("src", "../BACKEND/fotos/" + json.pathFoto);
            localStorage.setItem("modificar", "true");
            Manejadora.AgregarAlien();
        };
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
