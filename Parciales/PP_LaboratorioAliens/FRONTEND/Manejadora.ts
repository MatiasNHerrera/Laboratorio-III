/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="Alien.ts"/>

namespace RecuperatorioPrimerParcial
{
    export interface IParte2
    {
        EliminarAlien(json : any) : void;
        ModificarAlien(json : any) : void
    }

    export class Manejadora implements IParte2
    {
        public static AgregarAlien(actualizarStorage : boolean = false)
        {
            let cuadrante : string =(<HTMLInputElement> document.getElementById("cuadrante")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let altura : string =(<HTMLInputElement> document.getElementById("altura")).value;
            let planetaOrigen : string =(<HTMLInputElement> document.getElementById("cboPlaneta")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathModificado : string = (path.split('\\'))[2];

            let alien = new Entidades.Alien(cuadrante,parseInt(edad),parseFloat(altura),raza,planetaOrigen,pathModificado);

            let form : FormData = new FormData();

            form.append("cadenaJson", JSON.stringify(alien.toJSON()));
            form.append("foto", foto.files[0]);

            if(localStorage.getItem("modificar") == "false")
            {   
                let valor = $("#btn-agregar").val();

                if(valor == "Agregar")
                {
                    form.append("caso", "agregar");

                    let ajax = $.ajax({

                        type: "POST",
                        url: "../BACKEND/administrar.php",
                        cache: false,
                        contentType: false,
                        processData : false,
                        data: form,
                        dataType: "JSON"

                    })

                    ajax.done(function(respuesta){
                    
                        if(respuesta.TodoOK)
                        {
                            alert("Se ha podido guardar");
                            if(actualizarStorage)
                            {
                                Manejadora.GuardarEnLocalStorage();
                            }
                        }
                        else
                        {
                            alert("No se ha podido guardar");
                        }

                    })

                    ajax.fail(function() {
                        
                        alert("Ha ocurrido un error en ajax");
                    })
                }
                else
                {
                    form.append("caso", "modificar");

                    let ajax = $.ajax({

                        type: "POST",
                        url: "../BACKEND/administrar.php",
                        cache: false,
                        contentType: false,
                        processData : false,
                        data: form,
                        dataType: "JSON"

                    })

                    ajax.done(function(respuesta){
                    
                        if(respuesta.TodoOK)
                        {
                            alert("Se ha podido modificar");
                            $("#btn-agregar").val("Agregar");
                            $("#cuadrante").prop("disabled", false);
                            Manejadora.GuardarEnLocalStorage();
                            Manejadora.MostrarAliens();
                            
                        }
                        else
                        {
                            alert("No se ha podido modificar");
                            console.log("No se ha podido modificar de forma correcta");
                        }

                    })
                }
            }
            else
            {
                $("#btn-agregar").val("Modificar");
                localStorage.setItem("modificar", "false");

            }

        }

        public static MostrarAliens()
        {
            let form : FormData = new FormData();

            form.append("caso", "traer");

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON",
                data: form

            })

            ajax.done(function(respuesta){

                console.log(respuesta);
                let lista = respuesta;
                let tabla : string = "";

                tabla+= "<table border=1>";
                tabla+= "<tr>";
                tabla+= "<td>CUADRANTE</td>";
                tabla+= "<td>EDAD</td>";
                tabla+= "<td>ALTURA</td>";
                tabla+= "<td>PLANETA ORIGEN</td>";
                tabla+= "<td>RAZA</td>";
                tabla+= "<td>FOTO</td>";
                tabla+= "</tr>";
    
                lista.forEach(function(elemento : any){
                    
                    tabla+= "<tr>";
                    tabla+= "<td>" + elemento.cuadrante + "</td>";
                    tabla+= "<td>" + elemento.edad + "</td>";
                    tabla+= "<td>" + elemento.altura + "</td>";
                    tabla+= "<td>" + elemento.planetaOrigen + "</td>";
                    tabla+= "<td>" + elemento.raza + "</td>";
                    tabla+= "<td><img src=../BACKEND/fotos/" + elemento.pathFoto + " width='50px'></td>";
                    tabla+= `<td><input type='button' value='Eliminar' class='btn btn-warning' onclick='new RecuperatorioPrimerParcial.Manejadora().EliminarAlien(${JSON.stringify(elemento)})'>`;
                    tabla+= '</br>';
                    tabla+= `<input type='button' value='Modificar' class='btn btn-warning' onclick='new RecuperatorioPrimerParcial.Manejadora().ModificarAlien(${JSON.stringify(elemento)})'></td>`;
                });

                $("#divTabla").html(tabla);
            })
        }

        public static GuardarEnLocalStorage()
        {
            let form : FormData = new FormData();

            form.append("caso", "traer");

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON",
                data: form

            })

            ajax.done(function(respuesta){

                localStorage.setItem("aliens_local_storage", JSON.stringify(respuesta));

                if(localStorage["aliens_local_storage"] != null)
                {
                    alert("Guardado de forma correcta en local storage");
                }
                
            })

        }

        public static VerificarExistencia()
        {
            let cuadrante : any =  $("#cuadrante").val();
            let raza : any =  $("#raza").val();
            let datitos = JSON.parse(localStorage.getItem("aliens_local_storage"));
            let validacion = false;

            for(let i of datitos)
            {
                if(i.raza == raza && i.cuadrante == cuadrante)
                {
                    console.log("Ya se encuentra guardado en local storage");
                    alert("Ya se encuentra guardado en local storage");
                    validacion = true;
                    break;
                }
                
            }

            if(!validacion)
            {
                localStorage.setItem("aliens_local_storage","");
                Manejadora.AgregarAlien(true);
            }

        }

        public static ObtenerAliensPorCuadrante()
        {
            let aliens = JSON.parse(localStorage.getItem("aliens_local_storage") as string);    
            let contadores = [];

            for(let datos of aliens)
            {
                if(contadores[datos.cuadrante] === undefined)
                {
                    contadores.push(datos.cuadrante);
                    contadores[datos.cuadrante] = 0;
                }
                
                contadores[datos.cuadrante]++;
                
            }

            let max = null;
            let min = null;

            for(let datos of contadores)
            {
                if(max === null && min === null)
                {
                    max = contadores[datos];
                    min = contadores[datos];
                }

                break;
            }

            let maxStr = "El/Los cuadrantes con mayor cantidad de aliens es/son: ";
            let minStr = "El/Los cuadrantes con menor cantidad de aliens es/son: ";

            for(let planeta of contadores)
            {
                if(contadores[planeta] > max)
                {
                    max = contadores[planeta];
                }
                else if(contadores[planeta] < min)
                {
                    min = contadores[planeta];
                }   
            }

            for(let planetas of contadores)
            {
                if(contadores[planetas] == max)
                {
                    maxStr += planetas + "\n";
                }

                if(contadores[planetas] == min)
                {
                    minStr += planetas + "\n";
                }
            }

            console.log(maxStr + " con " + max);
            console.log(minStr + " con " + min);
        }

        public EliminarAlien(json : any)
        {
            let form : FormData = new FormData();

            form.append("caso", "eliminar");
            form.append("cadenaJson", JSON.stringify(json));

            if(confirm("Esta seguro que desea eliminar al cuadrante " + json.cuadrante + " y raza " + json.raza))
            {
                let ajax = $.ajax({

                    type: "POST",
                    url: "../BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    dataType: "JSON",
                    data: form

                })

                ajax.done(function(respuesta){

                    if(respuesta.TodoOK)
                    {
                        alert("Se ha eliminado con exito");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                    }
                    else
                    {
                        alert("No se ha podido eliminar");
                    }
                })
            }
        }

        public ModificarAlien(json : any)
        {
            $("#cuadrante").val(json.cuadrante);
            $("#cuadrante").prop("disabled", true);
            $("#edad").val(json.edad);
            $("#altura").val(json.altura);
            $("#raza").val(json.raza);
            $("#planetaOrigen").val(json.planetaOrigen);
            $("#imgFoto").attr("src", "../BACKEND/fotos/" + json.pathFoto);

            localStorage.setItem("modificar", "true");

            Manejadora.AgregarAlien();

        }

    }
}