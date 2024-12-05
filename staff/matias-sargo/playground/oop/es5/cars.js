function Car(year, brand, model, engine, color, plate, gear) {
    this.year = year
    this.brand = brand
    this.model = model
    this.engine = engine
    this.color = color
    this.plate = plate
    this.gear = gear || 0
}

Car.prototype.start = function () {
    return "brrrrm"
}

Car.prototype.brake = function () {
    return "red-light"
}

Car.prototype.shift_up = function () {
    if (this.gear < 5) {
        this.gear += 1
        console.info(this.gear)
    } else {
        console.info("max shift")
    }
}

Car.prototype.full_throttle = function () {
    return "Low Fuel"
}

// Override Object.prototype.toString
Car.prototype.toString = function () {
    return this.brand + " { year: " + this.year + ", brand: " + this.brand + ", model: " + this.model + ", engine: " + this.engine + ", color: " + this.color + ", plate: " + this.plate + ", gear: " + this.gear + " }"
}

module.exports = Car