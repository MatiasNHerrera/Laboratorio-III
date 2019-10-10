/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="Perro.ts"/>

namespace PrimerParcial 
{

    export interface IParte2
    {
        EliminarPerro(json : any) : void;
        ModificarPerro(json : any) : void;
        AdministrarSpinner(validacion : boolean) : void;
    }

    export interface IParte3
    {
        FiltrarPerroPorRaza() : void;
        CargarRazasJSON() : void;
    }

    export class Manejadora implements PrimerParcial.IParte2, PrimerParcial.IParte3
    {
        public static AgregarPerroJSON()
        {
            let tamanio : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
            let nombre : string =(<HTMLInputElement> document.getElementById("nombre")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathModificado : string = (path.split('\\'))[2];

            let perrito = new Entidades.Perro(nombre,raza,pathModificado,tamanio,parseInt(edad),parseInt(precio));

            let form : FormData = new FormData();

            form.append("foto",foto.files[0]);
            form.append("cadenaJson", JSON.stringify(perrito.toJSON()));
            
            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/agregar_json.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"

            })

            ajax.done(function(respuesta){

                if(respuesta.Ok)
                {
                    alert("se ha guardado el perro");
                }
                else
                {
                    alert("no se ha podido guardar el perro");
                }
                
            })

            ajax.fail(function(){

                alert("error al entregar los datos");
            })
        }

        public static MostrarPerrosJSON()
        {
            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/traer_json.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            ajax.done(function(respuesta){

                let lista = respuesta;
                let tabla : string = "";

                tabla+= "<table border=1>";
                tabla+= "<tr>";
                tabla+= "<td>NOMBRE</td>";
                tabla+= "<td>RAZA</td>";
                tabla+= "<td>TAMAÑO</td>";
                tabla+= "<td>EDAD</td>";
                tabla+= "<td>PRECIO</td>";
                tabla+= "<td>FOTO</td>";
                tabla+= "</tr>";
                console.log(lista);
                lista.forEach(function(elemento : any){
                    
                    tabla+= "<tr>";
                    tabla+= "<td>" + elemento.nombre + "</td>";
                    tabla+= "<td>" + elemento.raza + "</td>";
                    tabla+= "<td>" + elemento.tamanio + "</td>";
                    tabla+= "<td>" + elemento.edad + "</td>";
                    tabla+= "<td>" + elemento.precio + "</td>";
                    tabla+= "<td><img src=../BACKEND/fotos/" + elemento.pathFoto + " width='50px'></td>";
                    
                });

                $("#divTabla").html(tabla);
            })
        }

        public static AgregarPerroEnBaseDeDatos()
        {
            let tamanio : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
            let nombre : string =(<HTMLInputElement> document.getElementById("nombre")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathModificado : string = (path.split('\\'))[2];

            let perrito = new Entidades.Perro(nombre,raza,pathModificado,tamanio,parseInt(edad),parseInt(precio));

            let form : FormData = new FormData();

            form.append("foto",foto.files[0]);
            form.append("cadenaJson", JSON.stringify(perrito.toJSON()));

            if(localStorage.getItem("modificar") == "false")
            {
                let valor = $("#btnAgregarBd").val();

                if(valor == "Agregar en BD")
                {
                    let ajax = $.ajax({

                        type: "POST",
                        url: "../BACKEND/agregar_bd.php",
                        cache: false,
                        contentType: false,
                        processData : false,
                        data: form,
                        dataType: "JSON"

                    })

                    ajax.done(function(respuesta){

                        if(respuesta.Ok)
                        {
                            alert("Se ha agregado de forma correcta a la base de datos");
                            Manejadora.MostrarPerrosBaseDeDatos();
                        }
                        else
                        {
                            alert("No se ha podido agregar a la base de datos");
                        }

                    })
                }
                else
                {
                    let ajax = $.ajax({

                        type: "POST",
                        url: "../BACKEND/modificar_bd.php",
                        cache: false,
                        contentType: false,
                        processData : false,
                        data: form,
                        dataType: "JSON"

                    })


                    ajax.done(function(respuesta){

                        if(respuesta.Ok)
                        {
                            $("#btnAgregarBd").val("Agregar en BD");
                            $("#nombre").prop("disabled", false);
                            alert("Se ha modificado de forma correcta a la base de datos");
                            Manejadora.MostrarPerrosBaseDeDatos();
                        }
                        else
                        {
                            alert("No se ha podido modificar a la base de datos");
                            console.log("No se ha podido modificar en la base de datos");
                        }

                    })
                }
            }
            else
            {
                $("#btnAgregarBd").val("Modificar en BD");
                localStorage.setItem("modificar", "false");
            }
            
        }

        public static VerificarExistencia()
        {
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value;

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            ajax.done(function(respuesta){
            
            let validacion = false;

            for(let i of respuesta)
            {
                if(i.edad == edad && i.raza == raza)
                {
                    alert("Existe en la base de datos, no se agregara");
                    validacion = true;
                    return;
                }
            }

            if(!validacion)
            {
                Manejadora.AgregarPerroEnBaseDeDatos();
            }

            })
             
            ajax.fail(function(){

                alert("no se ha podido enviar datos de forma correcta");

            })
        }

        public static MostrarPerrosBaseDeDatos()
        {
            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            ajax.done(function(respuesta){

                let lista = respuesta;
                let tabla : string = "";

                tabla+= "<table border=1>";
                tabla+= "<tr>";
                tabla+= "<td>NOMBRE</td>";
                tabla+= "<td>RAZA</td>";
                tabla+= "<td>TAMAÑO</td>";
                tabla+= "<td>EDAD</td>";
                tabla+= "<td>PRECIO</td>";
                tabla+= "<td>FOTO</td>";
                tabla+= "</tr>";
                console.log(lista);
                lista.forEach(function(elemento : any){
                    
                    tabla+= "<tr>";
                    tabla+= "<td>" + elemento.nombre + "</td>";
                    tabla+= "<td>" + elemento.raza + "</td>";
                    tabla+= "<td>" + elemento.tamanio + "</td>";
                    tabla+= "<td>" + elemento.edad + "</td>";
                    tabla+= "<td>" + elemento.precio + "</td>";
                    
                    let dividido = elemento.pathFoto.indexOf("MODIFICADA");

                    console.log(dividido);

                    if(dividido != -1)
                    {
                        tabla+= "<td><img src=../BACKEND/fotos_modificadas/" + elemento.pathFoto + " width='50px'></td>";
                    }
                    else
                    {
                        tabla+= "<td><img src=../BACKEND/fotos/" + elemento.pathFoto + " width='50px'></td>";
                    }
                        tabla+= `<td><input type='button' value='Eliminar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().EliminarPerro(${JSON.stringify(elemento)})'>`;
                        tabla+= '</br>';
                        tabla+= `<input type='button' value='Modificar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().ModificarPerro(${JSON.stringify(elemento)})'></td>`;
                    
                });

                $("#divTabla").html(tabla);
            })
        }

        EliminarPerro(json : any)
        {
            let perro = json;

            let form : FormData = new FormData();
            form.append("cadenaJson", JSON.stringify(perro));

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            ajax.done(function(respuesta){

                for(let i of respuesta)
                {
                    if(i.nombre == perro.nombre && i.raza == perro.raza)
                    {
                        if(confirm("Desea eliminar a " + perro.nombre + " de raza "+ perro.raza))
                        {
                            let eliminar = $.ajax({

                                type: "POST",
                                url: "../BACKEND/eliminar_bd.php",
                                cache: false,
                                contentType: false,
                                processData : false,
                                dataType: "JSON",
                                data: form
        
                            })

                            eliminar.done(function(respuesta){
                            
                                console.log(respuesta);
                                if(!respuesta.Ok)
                                {
                                    alert("se ha eliminado de forma correcta");
                                    Manejadora.MostrarPerrosBaseDeDatos();
                                }
                                else
                                {
                                    alert("No se ha podido eliminar");
                                }
                            })
    
                        }

                        return;  
                    }
                }

            })

            
                
            
        }

        public ModificarPerro(json : any)
        {
            $("#tamaño").val(json.tamanio);
            $("#edad").val(json.edad);
            $("#precio").val(json.precio);
            $("#raza").val(json.raza);
            $("#nombre").val(json.nombre);
            $("#nombre").prop("disabled", true);

            localStorage.setItem("modificar" , "true");

            Manejadora.AgregarPerroEnBaseDeDatos();
            
        }


        public static ObtenerPerrosPorTamaño()
        {
            let chico : number = 0;
            let mediano : number= 0;
            let grande : number = 0;

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            ajax.done(function(respuesta){

                for(let i of respuesta)
                {
                    if(i.tamanio.toLowerCase() == "chico")
                    {
                        chico++;
                    }
                    else if(i.tamanio.toLowerCase() == "mediano")
                    {
                        mediano++;
                    }
                    else
                    {
                        grande++;
                    }
                }

                let max = chico;
                let min = chico;
                let maxTamaño = "chico";
                let minTamaño = "chico";

                if(mediano > max){
                    max = mediano;
                    maxTamaño = "mediano";
                }
                else if(mediano == max){
                    maxTamaño+= ", mediano";
                }

                if(grande > max){
                    max = grande;
                    maxTamaño = "grande"
                }
                else if(grande == max){
                    maxTamaño+= ", grande";
                }

                if(mediano < min){
                    min = mediano;
                    minTamaño = "mediano";
                }
                else if(mediano == min){
                    minTamaño+= ", mediano";
                }

                if(grande < min){
                    min = grande;
                    minTamaño = "grande";
                }
                else if(grande == min){
                    minTamaño+= ", grande";
                }

                console.log(`La mayor cantidad es ${maxTamaño} con ${max} perros.`);
                console.log(`La menor cantidad es ${minTamaño} con ${min} perros.`);

            })
        }

        public FiltrarPerroPorRaza()
        {
            let raza = $("#raza").val();
            let tabla : string = "";

                tabla+= "<table border=1>";
                tabla+= "<tr>";
                tabla+= "<td>NOMBRE</td>";
                tabla+= "<td>RAZA</td>";
                tabla+= "<td>TAMAÑO</td>";
                tabla+= "<td>EDAD</td>";
                tabla+= "<td>PRECIO</td>";
                tabla+= "<td>FOTO</td>";
                tabla+= "</tr>";

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            new PrimerParcial.Manejadora().AdministrarSpinner(true);

            ajax.done(function(respuesta){

                for(let i of respuesta)
                {
                    if(i.raza == raza)
                    {
                    tabla+= "<tr>";
                    tabla+= "<td>" + i.nombre + "</td>";
                    tabla+= "<td>" + i.raza + "</td>";
                    tabla+= "<td>" + i.tamanio + "</td>";
                    tabla+= "<td>" + i.edad + "</td>";
                    tabla+= "<td>" + i.precio + "</td>";
                    
                    let dividido = i.pathFoto.indexOf("MODIFICADA");

                    console.log(dividido);

                    if(dividido != -1)
                    {
                        tabla+= "<td><img src=../BACKEND/fotos_modificadas/" + i.pathFoto + " width='50px'></td>";
                    }
                    else
                    {
                        tabla+= "<td><img src=../BACKEND/fotos/" + i.pathFoto + " width='50px'></td>";
                    }
                    }
                }

                new PrimerParcial.Manejadora().AdministrarSpinner(false);
                $("#divTabla").html(tabla);
                
            })
        }

        public CargarRazasJSON()
        {
            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/cargar_raza.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })


            ajax.done(function(respuesta){

                for(let i of respuesta)
                {
                    $("#raza").append(`<option>${i.descripcion}</option>`);
                }

            })
            

        }

        AdministrarSpinner(validacion : boolean)
        {
            let mostrar = "";
            if(validacion)
            {
                mostrar = '<img id="imgSpinner" src="../BACKEND/gif-load.gif" />';
                $("#divTabla").html(mostrar);
            }
            else
            {
                $("#divTabla").html(" ");
            }
        }


    }


}