<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>LOGIN</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="ajax.js"></script>
    <link type="text/css" rel="stylesheet" href="./CSS/Error.css" />
    <link type="text/css" rel="stylesheet" href="./CSS/Valido.css" />

</head>
<body>
    CORREO 
    <br>
    <input type="text" id="txtCorreo" name="txtCorreo">
    <br>
    CLAVE
    <br>
    <input type="text" id="txtClave" name="txtClave">
    <br>
    <input type="submit" value="Aceptar" onclick="EnviarDatos()">
    <input type="button" value="Cancelar"> 
    <br>
    <input type="button" value="Registrarse" onclick="location.href = './registro.php'">
    <br>
    <br>
    <div id="divMensaje"></div>


</body>
</html>