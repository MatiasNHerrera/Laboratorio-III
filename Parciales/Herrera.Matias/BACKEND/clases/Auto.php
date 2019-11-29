<?php
    require_once './clases/AccesoDatos.php';

    class Auto{
        public $id;
        public $marca;
        public $color;
        public $precio;
        public $modelo;

        public function TraerTodos(){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta('SELECT * FROM autos');
            $consulta->execute(); 
            return $consulta->fetchAll(PDO::FETCH_CLASS, "Auto");
        }

        public function Tabla($request, $response, $args){
            $header = $request->getHeader("perfil");
            $perfil = $header[0];
            $listado = Auto::TraerTodos();
            $json = new stdClass;
            $tabla = "<table id='tableAuto' class='table table-bordered table-hover'><thead><tr class='danger'><td>Id</td><td>Marca</td><td>Color</td><td>Precio</td><td>Modelo</td></tr></thead><tbody>";
            if($perfil == "propietario")
            {
                $tabla ="<table id='tableAuto' class='table table-bordered table-hover'><thead><tr class='danger'><td>Id</td><td>Marca</td><td>Color</td><td>Precio</td><td>Modelo</td><td>Acciones</td></tr></thead><tbody>";
            }
            foreach($listado as $usu){
                $tabla.="<tr><td>$usu->id</td><td>$usu->marca</td><td>$usu->color</td><td>$usu->precio</td><td>$usu->modelo</td>";
                if($perfil == "propietario" || $perfil == "encargado")
                {
                    $tabla.= "<td><input type='button' class='btn-danger' value='Eliminar' onclick='EliminarUsuario($usu->id)'><input type='button' class='btn-warning' value='Modificar' onclick='ModificarUsuario($usu->id)'></td>";
                }
            }

            $tabla.="</tbody></table>";
            $json->ok = isset($tabla) ? true:false;
            $json->tabla = $tabla;

            return $response->withJson($json, 200);
        }

        public function EliminarAuto($request, $response)
        {
            $datos = $request->getHeader("id");
            $id =  intval($datos[0]);
            $json = new stdClass();
            $nuevaRespuesta = "";

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM autos WHERE id = :id");
            $consulta->bindValue(":id", $id);
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