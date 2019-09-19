function Mostrar() : void
{
    var http = new XMLHttpRequest();

    http.open("POST", "administracion.php",true);

    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    http.send("queHago=mostrarGrilla");

    http.onreadystatechange = function()
    {
        if(http.status == 200 && http.readyState == 4)
        {
            (<HTMLDivElement>document.getElementById("divGrilla")).innerHTML = http.responseText;
        }
    }
   
}

function Validar() : boolean
{
    var http = new XMLHttpRequest();
    var retorno : boolean = false;

    http.open("POST", "verificacion.php",true);
    
    var respuesta = http.responseText;
    
    if(respuesta = "ok")
    {
        retorno = true;
    }

    return retorno;
}

window.onload = function()
{
    if(Validar()){
    Mostrar();
    }
}

class Main
{
    public static AgregarProducto() : void
    {
       var http = new XMLHttpRequest();

       http.open("POST", "administracion.php", true);

       http.setRequestHeader("content-type", "application/x-www-form-urlencoded");

       http.send("queHago=agregar");

       http.onreadystatechange = function(){

        if(http.status == 200 && http.readyState == 4)
        {
            alert(http.responseText);
        }

       }
    }
}
