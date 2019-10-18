///<reference path="Mascota.ts"/>

namespace Entidades
{
    export class Perro extends Mascota 
    {
         public nombre : string;
         public raza : string;
         public pathFoto : string;

         public constructor(nombre : string, raza : string, pathFoto : string, tamanio : string, edad : number, precio : number)
         {
            super(tamanio,edad,precio);
            this.nombre = nombre;
            this.raza = raza;
            this.pathFoto = pathFoto;
         }

         public toJSON()
         {
             let datos = `{"nombre" : "${this.nombre}", "raza" : "${this.raza}", "pathFoto" : "${this.pathFoto}", ${super.ToString()}}`;

             return JSON.parse(datos);
         } 
    }

}