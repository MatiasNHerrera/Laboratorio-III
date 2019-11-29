<?php
class Usuario
{
    public function Tabla($request, $response, $args){

        $datos = $request->getHeader("perfil");
        $perfil = $datos[0];
        $listado = Usuario::TraerTodos();
        $json = new stdClass;
        $tabla = "<table id='tableUsers' class='table table-bordered table-hover'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Foto</td></tr></thead><tbody>";
        foreach($listado as $usu){
            $tabla.="<tr><td>$usu->correo</td><td>$usu->nombre</td><td>$usu->apellido</td><td>$usu->perfil</td>";
            if($perfil == "empleado")
            {
                $tabla.="<td><img class='fotoUser img-rounded' src='./backend/fotos/$usu->foto' height=50px width=50px></td></tr>";
            }
            else if($perfil == "encargado")
            {
                $tabla.="<td><img class='fotoUser img-thumbnail' src='./backend/fotos/$usu->foto' height=50px width=50px></td></tr>";
            }
            else
            {
                $tabla.="<td><img class='fotoUser' src='./backend/fotos/$usu->foto' height=50px width=50px></td></tr>";
            }
        }

        $tabla.="</tbody></table>";
        $json->ok = isset($tabla) ? true:false;
        $json->tabla = $tabla;

        return $response->withJson($json, 200);
    }

    public function TraerTodos(){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios');
        $consulta->execute(); 
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
    }
}