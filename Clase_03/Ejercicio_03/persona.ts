
namespace espacio
{

export abstract class Persona
{
    private _nombre : string;
    private _apellido : string;
    private _dni : number;
    private _sexo : string;
    
    public constructor(nombre : string, apellido : string, dni : number, sexo : string)
    {
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._sexo = sexo;
    }

    public GetNombre() : string
    {
        return this._nombre;
    }

    public GetApellido() : string
    {
        return this._apellido;
    }

    public GetSexo() : string
    {
        return this._sexo;
    }

    public GetDni() : number
    {
        return this._dni;
    }

    public abstract Hablar(idioma : string) : string;

    public ToString() : string
    {
        return this._nombre + " - " + this._apellido + " - " + this._dni + " - " + this._sexo;
    }

}

}