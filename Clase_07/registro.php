<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registro</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="ajax.js"></script>
    <link type="text/css" rel="stylesheet" href="./CSS/Error.css" />
    <link type="text/css" rel="stylesheet" href="./CSS/Valido.css" />

</head>
<body>
Nombre
<br>
<input type="text" id="nombre" name="nombre">
<br>
Apellido
<br>
<input type="text" id="apellido" name="apellido">
<br>
Correo
<br>
<input type="text" id="correo" name="correo">
<br>
Clave
<br>
<input type="text" id="clave" name="clave">
<br>
Perfil
<br>
<input type="text" id="perfil" name="perfil">
<br>
<br>
<input type="file" id="foto" name="foto">
<br>
<br>
<input type="submit" value="Sign In" onclick="Registrar()">
<input type="button" value="Cancel">
<div id="divMensaje"></div>
</body>
</html>