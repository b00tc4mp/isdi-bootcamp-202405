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
exports.Vinyl = exports.Record = void 0;
var Record = /** @class */ (function () {
    function Record(name, year) {
        this.name = name;
        this.year = year;
    }
    Record.prototype.produce = function () {
        console.log("The album".concat(this.name, " was released in ").concat(this.year, " "));
    };
    return Record;
}());
exports.Record = Record;
var Vinyl = /** @class */ (function (_super) {
    __extends(Vinyl, _super);
    function Vinyl(name, year, rpm) {
        var _this = _super.call(this, name, year) || this;
        _this.rpm = rpm;
        return _this;
    }
    Vinyl.prototype.play = function () {
        console.log("".concat(this.name, " plays at ").concat(this.rpm, " RPM."));
    };
    return Vinyl;
}(Record));
exports.Vinyl = Vinyl;
var myVinyl = new Vinyl('The Stooges', 1969, 45);
myVinyl.produce();
myVinyl.play();
