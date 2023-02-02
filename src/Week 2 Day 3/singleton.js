var controlcarro = /** @class */ (function () {
    function controlcarro() {
    }
    controlcarro.getInstance = function () {
        if (!controlcarro.instance) {
            controlcarro.instance = new controlcarro();
        }
        return controlcarro.instance;
    };
    controlcarro.prototype.logica = function () {
        // ...
    };
    return controlcarro;
}());
function cliente() {
    var orden1 = controlcarro.getInstance();
    var orden2 = controlcarro.getInstance();
    if (orden1 === orden2) {
        console.log('en perfecto estado para su operacion');
    }
    else {
        console.log('no cumple con los requerimientos minimos debe revisarse la orden');
    }
}
cliente();
