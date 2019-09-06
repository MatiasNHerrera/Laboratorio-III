//guardamos los datos en el localStorage
//en el localStorage solo se guarda texto
if(localStorage.getItem("Empleado") == null)
{
    localStorage.setItem("Empleados", "Juan-123,Rosa-456,Carlos-666");
}

function RecuperarDatos() : void
{
    let nombre : string;
    let legajo : number;

    nombre = (<HTMLInputElement>document.getElementById("nombreTxt")).value; 
    legajo = parseInt((<HTMLInputElement>document.getElementById("LegajoTxt")).value);

    var emp = localStorage.getItem("Empleados");

    var array = Array();
    var auxArray = Array();
    if(emp != null)
    {
        array = emp.split(",");
    }

    array.forEach(element => {
        auxArray = element.split("-");
    });

    console.log(auxArray);

    let validacion : Boolean = false;

    for(var i = 0; i < auxArray.length; i++)
    {
        console.log(auxArray[i]);

        if(nombre == auxArray[i] && legajo == auxArray[i+1])
        {
            validacion = true;   
            break;
        }
        else
        {
            validacion = false;
        }

    }
    

    if(validacion)
    {
        alert("Encontro persona");
    }
    else
    {
        alert("No encontro");
    }
    
}   