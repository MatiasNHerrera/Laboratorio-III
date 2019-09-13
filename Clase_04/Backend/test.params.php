<?php
//verifica que llegue como nombre de parametro "nombre", si no recibe ese parametro
//retorno una cara triste
$var = $_GET["nombre"];

if($var != null && isset($var))
{
    echo "hola". " - " . $var;
}
else
{
    echo ":(";
}