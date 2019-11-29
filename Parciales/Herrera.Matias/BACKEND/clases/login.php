<?php

require_once "AccesoDatos.php";
require_once "AutentificadorJWT.php";

class Login
{
    public function VerificarBD($request, $response)
    {
        $datos = $request->getParsedBody(); 
        $correo = $datos["email"];
        $clave = $datos["clave"];
        $retorno = new stdClass();
        $nuevaRespuesta = "";

        $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDatos->RetornarConsulta("SELECT correo,clave,nombre,apellido,perfil,foto FROM usuarios WHERE correo = :correo AND clave = :clave");
        $consulta->bindValue(":correo", $correo);
        $consulta->bindValue(":clave", $clave);
        $consulta->execute();
        $usuario = $consulta->fetchAll(PDO::FETCH_OBJ);

        if($consulta->rowCount() > 0)
        {
            $retorno->exito = true;
            $retorno->token = Login::GenerarJWT($usuario);
            $nuevaRespuesta = $response->withJson($retorno, 200);
        }
        else
        {
            $retorno->exito = false;
            $nuevaRespuesta = $response->withJson($retorno, 200);
        }

        return $nuevaRespuesta;
    }

    public static function VerificarCorreo($correo)
    {
        $retorno = false;
        $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDatos->RetornarConsulta("SELECT correo,clave,nombre,apellido,perfil,foto FROM usuarios WHERE correo = :correo");
        $consulta->bindValue(":correo", $correo);
        $consulta->execute();

        if($consulta->rowCount() > 0)
        {
            $retorno = true;
        }
        else
        {
            $retorno = false;
        }

        return $retorno;
    }

    public static function GenerarJWT($jsonUsuario)
    {   
        $token = new stdClass();
        foreach($jsonUsuario as $datos)
        {
            $token->correo = $datos->correo;
            $token->nombre = $datos->nombre;
            $token->apellido = $datos->apellido;
            $token->perfil = $datos->perfil;
        }

        $tokenGenerado = AutentificadorJWT::CrearToken($token);

        return $tokenGenerado;
    }

    public function VerificarJWT($request, $response)
    {
        $token = $request->getHeader("token");
        $tokenReal = $token[0];
        $json = new stdClass();
        $datos = AutentificadorJWT::ObtenerData($tokenReal);
        $nuevaRespuesta = "";

        try
        {
            AutentificadorJWT::VerificarToken($tokenReal);
            $json->exito = true;
            $json->perfil = $datos->perfil;
            $nuevaRespuesta = $response->withJson($json, 200);
        }
        catch(Exception $e)
        {
            $json->exito = false;
            $nuevaRespuesta = $response->withJson($json, 200);
        }

        return $nuevaRespuesta;
    }
}