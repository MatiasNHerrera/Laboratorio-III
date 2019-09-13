<?php
session_start();

if(isset($_SESSION["usuario"]) && $_SESSION["usuario"] == 'ok')
{
    echo "ok";
}
else
{
    header("location: 'login.php'");
}