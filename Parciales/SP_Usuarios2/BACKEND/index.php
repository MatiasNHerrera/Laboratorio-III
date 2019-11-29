<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/registro.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

//$app->post('[/]',\Registro::class . ":RegistrarUsuario");
$app->post('/', function($request, $response){

    return $response->getBody()->write("hola");    
});

//$app->get('/', \UsuarioApi::class . "::MostrarUsuarios");

$app->run();