var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var orden = /** @class */ (function () {
    function orden() {
    }
    orden.prototype.autoNuevo = function () {
        var carro = this.MetodoFabricacion();
        return "usted uso la orden para su auto nuevo ".concat(carro.operation());
    };
    return orden;
}());
var TipoCarro1 = /** @class */ (function (_super) {
    __extends(TipoCarro1, _super);
    function TipoCarro1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TipoCarro1.prototype.MetodoFabricacion = function () {
        return new carro1();
    };
    return TipoCarro1;
}(orden));
var TipoCarro2 = /** @class */ (function (_super) {
    __extends(TipoCarro2, _super);
    function TipoCarro2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TipoCarro2.prototype.MetodoFabricacion = function () {
        return new carro2();
    };
    return TipoCarro2;
}(orden));
var carro1 = /** @class */ (function () {
    function carro1() {
    }
    carro1.prototype.operation = function () {
        console.log('-----------------------amarillo-----------------------------');
        return '{taxi es tipocarro1}';
    };
    return carro1;
}());
var carro2 = /** @class */ (function () {
    function carro2() {
    }
    carro2.prototype.operation = function () {
        console.log('-----------------------rojos-----------------------------');
        return '{familiar es tipocarro2}';
    };
    return carro2;
}());
function cliente(orden) {
    // ...
    console.log('Cliente: no conozco la clase orden, pero aún funciona');
    console.log(orden.autoNuevo());
    // ...
}
console.log('compro: TipoCarro1.');
cliente(new TipoCarro1());
// console.log('compro: TipoCarro2.');
// cliente(new TipoCarro2());
