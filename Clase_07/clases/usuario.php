<?php
require "AccesoDatos.php";

class Usuario
{
    public $id;
    public $nombre;
    public $apellido;
    public $clave;
    public $perfil;
    public $estado;
    public $correo;
    public $foto;

    /*public function __construct($json)
    {
        $this->nombre = $json->nombre;
        $this->apellido = $json->apellido;
        $this->clave = $json->clave;
        $this->perfil = $json->perfil;
        $this->correo = $json->correo;
        $this->estado = 1;
        $this->foto = $_FILES["foto"]["name"];
    }*/

    public function MostrarDatos()
    {
        return $this->id. " - ". $this->nombre. " - ". $this->apellido. " - ". $this->clave. " - ". $this->perfil . " - ". $this->estado. " - ". $this->correo;
    }

    public static function TraerTodosUsuarios()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre,apellido,clave,perfil,estado,correo,foto from usuarios");        
        
        $consulta->execute();
        
        $retorno = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario"); 

        return $retorno; 
    }

    public static function TraerUnUsuario($id) 
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,nombre,apellido,clave,perfil,estado,correo,foto from usuarios WHERE id=$id");
			$consulta->execute();
			$cdBuscado= $consulta->fetchObject('Usuario');
			return $cdBuscado;						
	}

    public function InsertarUsuario()
    {
        $validacion = false;

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        //$datos = json_decode($_POST["usuario"]);
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (nombre,apellido,clave,perfil,estado,correo,foto)"
                                                    . "VALUES(:nombre, :apellido, :clave, :perfil, :estado, :correo, :foto)");

        $consulta->bindValue(':nombre', $this->nombre);
        $consulta->bindValue(':apellido', $this->apellido);
        $consulta->bindValue(':clave', $this->clave);
        $consulta->bindValue(':perfil', $this->perfil);
        $consulta->bindValue(':estado', 1);
        $consulta->bindValue(':correo', $this->correo);    
        $consulta->bindValue(':foto', Usuario::SubirFoto());

        $validacion = $consulta->execute(); 
        
        return $validacion;

    }
    
    public function ModificarUsuarios()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET nombre=:nombre, apellido=:apellido,clave=:clave,perfil=:perfil, estado=:estado, correo=:correo 
        WHERE id=:id");
        
        $consulta->bindValue(':nombre', $this->nombre);
        $consulta->bindValue(':apellido', $this->apellido);
        $consulta->bindValue(':clave', $this->clave);
        $consulta->bindValue(':perfil', $this->perfil);
        $consulta->bindValue(':estado', $this->estado);
        $consulta->bindValue(':correo', $this->correo);
        $consulta->bindValue(':id', $this->id);


        $consulta->execute(); 

        return $consulta->rowCount();
    }
    
    public function EliminarUsuario()
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM usuarios WHERE id = :id");
        
        $consulta->bindValue(':id', $this->id);

        $validacion = $consulta->execute();

        return $validacion;
    }

    public static function validarBD($correo, $clave)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $datos = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE correo ='". $correo ."' AND clave = '". $clave . "'");
        $datos->execute();
        $retorno = false;
        $json = new stdClass();

        if($datos->rowCount() > 0)
        {
            $json->user = $datos->fetchAll(PDO::FETCH_OBJ); //RETORNO LOS OBJETOS GUARDADOS EN LA CONSULTA
            $json->existe = true;
            $json->mensaje = "Existe en la base de datos";
        }
        else{
            $json->existe = false;
            $json->mensaje = "No existe en base de datos";
        }

        return $json;
    }

    public static function SubirFoto()
    {
        $retorno = false;
        $nombre = $_FILES["foto"]["name"];
        $destino = "./fotos/ ". $_FILES["foto"]["name"]; //sigo parado en verificacion.

        if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino))
        {
            $retorno = $destino;
        }

        return $nombre;
    }


    /*DESDE ACA EMPIEZA TODA LA PARTE DE REST*/

    public function TraerTodos($request, $response, $args){

       $todosLosUsuarios= Usuario::TraerTodosUsuarios();
       $newResponse = $response->withJson($todosLosUsuarios, 200); 
       return $newResponse;
    }

    public function TraerUno($request, $response, $args) {
        $id=$args['id'];
        $elUsuario= Usuario::TraerUnUsuario($id);
        $newResponse = $response->withJson($elUsuario, 200);  
        return $newResponse;
   }

   public function DeleteUsuario($request, $response, $args)
   {
        $ArrayDeParametros = $request->getParsedBody();
        $id=$ArrayDeParametros['id'];
        $cd= new Usuario();
        $cd->id=$id;

        $validacion=$cd->EliminarUsuario();

        $objDelaRespuesta= new stdclass();

        if($validacion)
        {
                $objDelaRespuesta->resultado="algo borro!!!";
        }
        else
        {
            $objDelaRespuesta->resultado="no Borro nada!!!";
        }

        $newResponse = $response->withJson($objDelaRespuesta, 200);  
        return $newResponse;
   }

   public function ModifiUsuario($request, $response, $args)
   {
        $ArrayDeParametros = $request->getParsedBody();
        //$archivos = $request->getUploadedFiles();
        //$destino="./fotos/";
        //$nombreAnterior=$archivos['foto']->getClientFilename(); 
        //$extension= explode(".", $nombreAnterior);
        //$path = $nombreAnterior. ".".date("d-m-y") . "." . $extension[1];
        //$destino .= $nombreAnterior. ".".date("d-m-y") . "." . $extension[1];

        //var_dump($ArrayDeParametros);    	
        $Usuario = new Usuario();
        $Usuario->id=$ArrayDeParametros['id'];
        $Usuario->nombre=$ArrayDeParametros['nombre'];
        $Usuario->apellido=$ArrayDeParametros['apellido'];
        $Usuario->clave=$ArrayDeParametros['clave'];
        $Usuario->perfil=$ArrayDeParametros['perfil'];
        $Usuario->estado=$ArrayDeParametros['estado'];
        $Usuario->correo=$ArrayDeParametros['correo'];
        //$Usuario->foto = $path;
        $objDelaRespuesta= new stdclass();

        $resultado = $Usuario->ModificarUsuarios();

        echo $resultado;

        if($resultado > 0)
        {
            $objDelaRespuesta->resultado= "se ha modificado";
        }
        else
        {
            $objDelaRespuesta->resultado= "no se ha modificado";
        }
        
        //$archivos['foto']->moveTo($destino);
        return $response->withJson($objDelaRespuesta, 200);		
   }

   public function AgregarUsu($request, $response)
   {
        $ArrayDeParametros = $request->getParsedBody(); //OBTENGO LOS DATOS PASADOS POR POSTMAN EN ARRAY DINAMICO

        $archivos = $request->getUploadedFiles(); //OBTENGO LOS ARCHIVOS SUBIDOS
        $destino="./fotos/";
        $nombreAnterior=$archivos['foto']->getClientFilename(); //OBTENGO EL NOMBRE DEL ARCHIVO CON CLAVE VALOR
        $extension= explode(".", $nombreAnterior); //OBTENGO EXTENSION
        $path = date("d-m-y") . "." . $extension[1];
        $destino .= $path;

        $datos = json_decode($ArrayDeParametros["usuario"]);
        $Usuario = new Usuario();

        $Usuario->nombre= $datos->nombre;
        $Usuario->apellido= $datos->apellido;
        $Usuario->clave= $datos->clave;
        $Usuario->perfil= $datos->perfil;
        $Usuario->correo= $datos->correo;
        $Usuario->foto = $path;


        $objDelaRespuesta= new stdclass();
        $retorno = "";

        $archivos['foto']->moveTo($destino);

        $respuesta = $Usuario->InsertarUsuario();

        if($respuesta)
        {
            $objDelaRespuesta->exito = true;
            $objDelaRespuesta->mensaje = "se ha podido agregar";
            $objDelaRespuesta->user = $Usuario;
            $retorno = $response->withJson($objDelaRespuesta, 200);
        }
        else
        {
            $objDelaRespuesta->exito = false;
            $objDelaRespuesta->mensaje = "no se ha podido agregar";
            $retorno = $response->withJson($objDelaRespuesta, 200);
        }

        return $retorno;
        
   }

}