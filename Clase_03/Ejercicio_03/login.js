//guardamos los datos en el localStorage
//en el localStorage solo se guarda texto
if (localStorage.getItem("Empleado") == null) {
    localStorage.setItem("Empleados", "Juan-123,Rosa-456,Carlos-666");
}
function RecuperarDatos() {
    var nombre;
    var legajo;
    nombre = document.getElementById("nombreTxt").value;
    legajo = parseInt(document.getElementById("LegajoTxt").value);
    var emp = localStorage.getItem("Empleados");
    var array = Array();
    var auxArray = Array();
    if (emp != null) {
        array = emp.split(",");
    }
    array.forEach(function (element) {
        auxArray = element.split("-");
    });
    console.log(auxArray);
    var validacion = false;
    for (var i = 0; i < auxArray.length; i++) {
        console.log(auxArray[i]);
        if (nombre == auxArray[i] && legajo == auxArray[i + 1]) {
            validacion = true;
            break;
        }
        else {
            validacion = false;
        }
    }
    if (validacion) {
        alert("Encontro persona");
    }
    else {
        alert("No encontro");
    }
}
