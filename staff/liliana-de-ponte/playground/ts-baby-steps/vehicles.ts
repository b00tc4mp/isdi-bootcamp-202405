interface IVehicle {
    start(): void,
    stop(): void,
    beep(): void
}

abstract class Vehicle implements IVehicle {
    brand: string
    model: string

    constructor(brand: string, model: string) {
        this.brand = brand
        this.model = model
    }

    abstract start(): void

    abstract stop(): void

    abstract beep(): void

    toString() {
        return `${this.brand} ${this.model}`
    }
}

class Car extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🚙 brum`)
    }
    stop(): void {
        console.log(`${this.toString()} 🚙 broh`)
    }
    beep(): void {
        console.log(`${this.toString()} 🚙 beeh beeh`)

    }
}

class Truck extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🚚 brooom`)
    }
    stop(): void {
        console.log(`${this.toString()} 🚚 broh broh brooooh`)
    }
    beep(): void {
        console.log(`${this.toString()} 🚚 booooooooh`)

    }
}

class Moto extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🛵 meeem`)
    }
    stop(): void {
        console.log(`${this.toString()} 🛵 meow`)
    }
    beep(): void {
        console.log(`${this.toString()} 🛵 beh beh`)

    }
}

const fiat500 = new Car('Fiat', '500')
//fiat500.start()

const lamboDiablo = new Car('Lamborghini', 'Diablo')
//lamboDiablo.start()

const scania5000 = new Truck('Sacnia', '5000')
// scania5000.start()

const vespa125 = new Moto('Vespa', '125')
// vespa15.start()

const vehicles: IVehicle[] = [fiat500, lamboDiablo, scania5000, vespa125]

vehicles.forEach((vehicle: IVehicle) => vehicle.start())