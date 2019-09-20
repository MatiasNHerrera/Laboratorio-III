<?php

/*$producto = json_decode($_POST["producto"]);

$producto->codigo_barra = 444;
$producto->nombre = "banana";
$producto->precio = 178.54;

$json = json_encode($producto);

var_dump($json);*/

$archivo = fopen("autos.json","r",true);

$informacion = fread($archivo, filesize("autos.json"));

fclose($archivo);

if($informacion != null)
{
    echo $informacion;
}



