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
    abstract stro(): void
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
        console.log(`${this.toString()} 🚙 bee bee`)

    }

}

class Truck extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🚚 brum`)
    }

    stop(): void {
        console.log(`${this.toString()} 🚚 broh`)
    }

    beep(): void {
        console.log(`${this.toString()} 🚚 bee bee`)

    }

}

class Moto extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🛵 meem`)
    }

    stop(): void {
        console.log(`${this.toString()} 🛵 meeoow`)
    }

    beep(): void {
        console.log(`${this.toString()} 🛵 beepp beepp`)

    }

}

const fiat500 = new Car('Fiat', '500')

const LamboDiablo = new Car('Lamborghini', 'Diablo')

const scania5000 = new Truck('scania', '5000')

const vespa125 = new Moto('Vespa', '125')

const vehicle: IVehicle[] = [fiat500, LamboDiablo, scania5000, vespa125]

vehicle.forEach((vehicle: IVehicle) => vehicle.start())