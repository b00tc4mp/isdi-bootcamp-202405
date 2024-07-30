"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var classes_js_1 = require("./classes.js");
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model, numberOfDoors) {
        var _this = _super.call(this, brand, model) || this; // Llama al constructor de la clase base
        _this.numberOfDoors = numberOfDoors;
        return _this;
    }
    Car.prototype.openTrunk = function () {
        console.log("Opening trunk of ".concat(this.brand, " ").concat(this.model, "."));
    };
    return Car;
}(classes_js_1.Vehicle));
exports.Car = Car;
var myCar = new Car('Toyota', 'Corolla', 4);
myCar.start();
myCar.stop();
