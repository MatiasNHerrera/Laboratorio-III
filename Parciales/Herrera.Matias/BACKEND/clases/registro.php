<?php

require_once "AccesoDatos.php";
require_once "login.php";

class Registro
{
    public function RegistrarUsuario($request, $response)
    {
        $datos = $_POST['json'];
        $foto = $_FILES['foto'];
        $path = $_FILES['foto']['name'];
        $usuarios = json_decode($datos);
        $destino = "./fotos/" . $path;
        $json = new stdClass();
        $nuevaRespuesta = "";

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto) values (:correo,:clave,:nombre,:apellido,:perfil,:foto)");
        $consulta->bindValue(":correo", $usuarios->correo);
        $consulta->bindValue(":clave", $usuarios->clave);
        $consulta->bindValue(":nombre", $usuarios->nombre);
        $consulta->bindValue(":apellido", $usuarios->apellido);
        $consulta->bindValue(":perfil", $usuarios->perfil);
        $consulta->bindValue(":foto", $path);

        $registrado = Login::VerificarCorreo($usuarios->correo);

        if(!$registrado && move_uploaded_file($_FILES["foto"]["tmp_name"], $destino))
        {
            $consulta->execute();
            $json->mensaje = "Se ha registrado correctamente";
        }
        
        if($consulta->rowCount() > 0)
        {
            $json->exito = true;
            $nuevaRespuesta = $response->withJson($json, 200);
        }
        else
        {
           $json->exito = false;
           $nuevaRespuesta = $response->withJson($json, 200);
        }
        
        return $nuevaRespuesta;

    }
}