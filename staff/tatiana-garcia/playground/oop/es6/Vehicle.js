class Vehicle {

    constructor(brand, model) {
        this.brand = brand
        this.model = model
    }

    start() {
        return this.brand + ' ' + this.model + ' is starting'
    }

    stop() {

        return this.brand + ' ' + this.model + ' is stopping'

    }

    toString() {

        return Vehicle.name + ' {Brand: ' + this.brand + ', Model: ' + this.model + '}'
    }
}


module.exports = Vehicle