"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    Vehicle.prototype.start = function () {
        console.log("".concat(this.brand, " ").concat(this.model, " is starting."));
    };
    Vehicle.prototype.stop = function () {
        console.log("".concat(this.brand, " ").concat(this.model, " is stopping."));
    };
    return Vehicle;
}());
exports.Vehicle = Vehicle;
