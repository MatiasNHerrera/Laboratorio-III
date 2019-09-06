"use strict";
var espacio;
(function (espacio) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, sexo) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._dni = dni;
            this._sexo = sexo;
        }
        Persona.prototype.GetNombre = function () {
            return this._nombre;
        };
        Persona.prototype.GetApellido = function () {
            return this._apellido;
        };
        Persona.prototype.GetSexo = function () {
            return this._sexo;
        };
        Persona.prototype.GetDni = function () {
            return this._dni;
        };
        Persona.prototype.ToString = function () {
            return this._nombre + " - " + this._apellido + " - " + this._dni + " - " + this._sexo;
        };
        return Persona;
    }());
    espacio.Persona = Persona;
})(espacio || (espacio = {}));
//# sourceMappingURL=persona.js.map