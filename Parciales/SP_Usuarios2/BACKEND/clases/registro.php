<?php

require_once "AccesoDatos.php";

class Registro
{
    public function RegistrarUsuario($request, $response)
    {
        $datos = $request->getParsedBody();
        $foto = $request->getUploadedFiles();
        $path = $foto['foto']->getClientFilename();
        $correo = $datos["correo"];
        $clave = $datos["clave"];
        $nombre = $datos["nombre"];
        $apellido = $datos["apellido"];
        $perfil = $datos["perfil"];
        $legajo = $datos["legajo"];
        $destino = "./fotos/" . $path;
        $foto['foto']->moveTo($destino);

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto) values (:correo,:clave,:nombre,:apellido,:perfil,:foto)");
        $consulta->bindValue(":correo", $correo);
        $consulta->bindValue(":clave", $clave);
        $consulta->bindValue(":nombre", $nombre);
        $consulta->bindValue(":apellido", $apellido);
        $consulta->bindValue(":perfil", $perfil);
        $consulta->bindValue(":foto", $path);

        $consulta->execute();
        
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