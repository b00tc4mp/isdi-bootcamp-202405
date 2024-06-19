var Car = require("./cars")

function Plane(year, brand, model, engine, color, plate, gear) {
    Car.call(this, year, brand, model, engine, color, plate)

}

//Plane.prototype = new Car

Plane.prototype = Object.create(Car.prototype)
Plane.prototype.constructor = Car

Plane.prototype.departure = function () {
    return "fly"
}

Plane.prototype.turbulence = function () {
    return "Disconect autopilot"
}

// Override Car.prototype.toString
Plane.prototype.toString = function () {
    return this.brand + " { year: " + this.year + ", brand: " + this.brand + ", model: " + this.model + ", engine: " + this.engine + ", color: " + this.color + ", plate: " + this.plate + ", gear: " + this.gear + " }"
}

module.exports = Plane