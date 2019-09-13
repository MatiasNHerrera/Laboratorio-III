//guardamos los datos en el localStorage
//en el localStorage solo se guarda texto
if(localStorage.getItem("Empleados") == null)
{
    localStorage.setItem("Empleados", "Juan-123,Rosa-456,Carlos-666");
}

function RecuperarDatos() : void
{
   
}

function AgregarPersonas() : void
{
    let nombre : string;
    let legajo : number;

    nombre = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    legajo = parseInt((<HTMLInputElement>document.getElementById("txtLegajo")).value);

    var emp = localStorage.getItem("Empleados");

    var array = Array();
    var auxArray = Array();
    var auxArray2 = Array();

    if(emp != null)
    {
        array = emp.split(",");
    }

    array.forEach(element => {
        auxArray = element.split("-");
        auxArray.forEach(element => {
            auxArray2.push(element);
        });
    });

    let validacion : boolean = false;
    console.log(auxArray2);
    for(var i = 0; i < auxArray2.length; i++)
    {   
        if(legajo == parseInt(auxArray2[i+1]))
        {
            validacion = true;
            break;
        }

        i++;
    }

    if(!validacion){
        var string = localStorage.getItem("Empleados");
        string += "," + nombre + "-" + legajo; 
        if(string != null)
        {
            localStorage.setItem("Empleados", string);
        }

        alert("Se ha registrado de forma correcta");

        console.log(localStorage.getItem("Empleados"));
    }
    else
    {
        alert("Ya se encuentra esta persona en la base de datos");
    }

}