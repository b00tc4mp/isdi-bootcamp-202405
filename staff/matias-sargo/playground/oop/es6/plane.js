const Car = require("./cars")

class Plane extends Car {
    constructor(year, brand, model, engine, color, plate, gear) {
        super(year, brand, model, engine, color, plate, gear)
    }

    departure() {
        return "Fly"
    }

    turbulence() {
        return "Disconect autopilot"
    }

    toString() {
        return this.brand + " { year: " + this.year + ", brand: " + this.brand + ", model: " + this.model + ", engine: " + this.engine + ", color: " + this.color + ", plate: " + this.plate + ", gear: " + this.gear + " }"
    }

}
module.exports = Plane

