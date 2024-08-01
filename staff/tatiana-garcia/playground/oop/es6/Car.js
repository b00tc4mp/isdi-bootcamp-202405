const Vehicle = require('./Vehicle')

class Car extends Vehicle {

    constructor(brand, model) {
        super(brand, model)
    }

    doors(number) {

        return this.brand + ' ' + this.model + ' is has ' + number + ' doors'
    }

    honk() {
        return this.brand + ' ' + this.model + ' is honking'
    }

    toString() {

        return Car.name + ' {Brand: ' + this.brand + ', Model: ' + this.model + '}'
    }


}

module.exports = Car