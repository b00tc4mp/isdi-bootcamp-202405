class Car {
    constructor(year, brand, model, engine, color, plate, gear) {
        this.year = year
        this.brand = brand
        this.model = model
        this.engine = engine
        this.color = color
        this.plate = plate
        this.gear = gear || 0

    }

    start() {
        return "brmm"
    }

    brake() {
        return "red-light"
    }

    shift_up() {
        if (this.gear < 5) {
            this.gear += 1
            console.info(this.gear)
        } else {
            console.info("max shift")
        }
    }

    full_throttle() {
        return "Low Fuel"
    }

    toString() {
        return this.brand + " { year: " + this.year + ", brand: " + this.brand + ", model: " + this.model + ", engine: " + this.engine + ", color: " + this.color + ", plate: " + this.plate + ", gear: " + this.gear + " }"
    }

}

module.exports = Car