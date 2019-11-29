<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';
require_once './clases/login.php';
require_once './clases/registro.php';
require_once './clases/Auto.php';
require_once './clases/Usuario.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);

$app->post("[/]", \Login::class . ":VerificarBD");
$app->post("/registro", \Registro::class . ":RegistrarUsuario");
$app->get('/TablaUsuario', \Usuario::class . ':Tabla');
$app->get('/TablaAuto', \Auto::class . ':Tabla');
$app->get("/validacion", \Login::class . ":VerificarJWT");
$app->get("/eliminarAuto", \Auto::class . ":EliminarAuto");

$app->run();