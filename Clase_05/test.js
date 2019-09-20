/*var obj = {"codigo_barra" : "ABC123", "precio" : 257.33, "nombre" : "tomate"};
var http = new XMLHttpRequest();

http.open("POST", "./Json_Test.php",true);

http.setRequestHeader("content-type","application/x-www-form-urlencoded");

http.send("producto=" + JSON.stringify(obj));

http.onreadystatechange = function(){

    if(http.status == 200 && http.readyState == 4)
    {
        alert(http.responseText);
    }

}*/
var http = new XMLHttpRequest();
http.open("POST", "Json_Test.php", true);
http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
http.send();
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var table = "<table border='1'><tr><td>Id</td> <td>Marca</td> <td>Precio</td> <td>Color</td> <td>Modelo</td> <td>Acciones</td></tr>";
        var autos = JSON.parse(http.responseText);
        var i = 0;
        for (i; i < autos.length; i++) {
            //console.log(autos[i]);
            table += "<tr><td>" + autos[i].Id + "</td>" +
                "<td>" + autos[i].Marca + "</td>" +
                "<td>" + autos[i].Precio + "</td>" +
                "<td>" + autos[i].Color + "</td>" +
                "<td>" + autos[i].Modelo + "</td>" +
                "<td><input type='button' value='MostrarAutito' onclick='verAuto(" + JSON.stringify(autos[i]) + "')></td></tr>";
        }
        table += "</table>";
        document.write(table);
    }
};
function verAuto(obj) {
    console.log(obj);
}
