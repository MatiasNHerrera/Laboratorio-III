var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
///<reference path="persona.ts"/>
var espacio;
(function (espacio) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, sexo, legajo, sueldo) {
            var _this = _super.call(this, nombre, apellido, dni, sexo) || this;
            _this._legajo = legajo;
            _this._sueldo = sueldo;
            return _this;
        }
        Empleado.prototype.GetSueldo = function () {
            return this._sueldo;
        };
        Empleado.prototype.GetLegajo = function () {
            return this._legajo;
        };
        Empleado.prototype.Hablar = function (idioma) {
            var retorno;
            retorno = "El empleado habla: " + idioma;
            return retorno;
        };
        Empleado.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + " - " + this._sueldo + " - " + this._legajo;
        };
        return Empleado;
    }(espacio.Persona));
    espacio.Empleado = Empleado;
})(espacio || (espacio = {}));
///<reference path="empleado.ts"/>
var empleado1 = new espacio.Empleado("Matias", "Herrera", 42038513, "Masculino", 0, 25000);
var empleado2 = new espacio.Empleado("Tomi", "Corneta", 42043134, "Masculino", 1, 25000);
console.log("hola");
console.log(empleado1.ToString());
console.log(empleado2.ToString());
console.log(empleado1.Hablar("Español"));
