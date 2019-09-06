///<reference path="persona.ts"/>

namespace espacio
{ 

export class Empleado extends Persona
{
    protected _sueldo : number;
    protected _legajo : number;

    public constructor(nombre : string, apellido : string, dni : number, sexo : string, legajo : number, sueldo : number)
    {
        super(nombre, apellido, dni, sexo);
        this._legajo = legajo;
        this._sueldo = sueldo;
    }

    public GetSueldo() : number
    {
        return this._sueldo;
    }

    public GetLegajo() : number 
    {
        return this._legajo;
    }

    public Hablar(idioma : string) : string
    {
        var retorno : string;

        retorno = "El empleado habla: " + idioma;

        return retorno;
    }

    public ToString() : string
    {
        return super.ToString() + " - " + this._sueldo + " - " + this._legajo;
    }
}

}