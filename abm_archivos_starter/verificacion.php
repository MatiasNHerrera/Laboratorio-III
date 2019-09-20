<?php
session_start();

if(isset($_SESSION["usuario"]) && $_SESSION["usuario"] == 'ok')
{
    echo "hola";
}
else
{
    $_SESSION["usuario"] = "ok";
    header("location: login.php");
}