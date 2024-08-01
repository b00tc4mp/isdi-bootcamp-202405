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
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    Vehicle.prototype.toString = function () {
        return "".concat(this.brand, " ").concat(this.model);
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model) {
        return _super.call(this, brand, model) || this;
    }
    Car.prototype.start = function () {
        console.log("".concat(this.toString(), " \uD83D\uDE97 brrummm"));
    };
    Car.prototype.stop = function () {
        console.log("".concat(this.toString(), " \uD83D\uDE97 broh"));
    };
    Car.prototype.beep = function () {
        console.log("".concat(this.toString(), " \uD83D\uDE97 meec meeeec"));
    };
    return Car;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(brand, model) {
        return _super.call(this, brand, model) || this;
    }
    Truck.prototype.start = function () {
        console.log("".concat(this.toString(), " \uD83D\uDEFB brooooommm"));
    };
    Truck.prototype.stop = function () {
        console.log("".concat(this.toString(), " \uD83D\uDEFB bom bom bom"));
    };
    Truck.prototype.beep = function () {
        console.log("".concat(this.toString(), " \uD83D\uDEFB auuuuuaa"));
    };
    return Truck;
}(Vehicle));
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto(brand, model) {
        return _super.call(this, brand, model) || this;
    }
    Moto.prototype.start = function () {
        console.log("".concat(this.toString(), " \uD83D\uDEF5 bem bem bem beeeeeeemmmm beeemmmm"));
    };
    Moto.prototype.stop = function () {
        console.log("".concat(this.toString(), " \uD83D\uDEF5 bom bom bom bom bom"));
    };
    Moto.prototype.beep = function () {
        console.log("".concat(this.toString(), " \uD83D\uDEF5 beep beeeep"));
    };
    return Moto;
}(Vehicle));
var fiat500 = new Car('Fiat', '500');
var lamboDiablo = new Car('Lamborgini', 'Diablo');
var scania5000 = new Truck('Scania', '5000');
var vespa125 = new Moto('Vespa', '125');
var vehicles = [fiat500, lamboDiablo, scania5000, vespa125];
vehicles.forEach(function (vehicle) { return vehicle.start(); });
