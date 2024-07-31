//interface with class type

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
        console.log(`${this.toString()} 🚗 brrummm`)
    }

    stop(): void {
        console.log(`${this.toString()} 🚗 broh`)
    }

    beep(): void {
        console.log(`${this.toString()} 🚗 meec meeeec`)
    }
}

class Truck extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🛻 brooooommm`)
    }

    stop(): void {
        console.log(`${this.toString()} 🛻 bom bom bom`)
    }

    beep(): void {
        console.log(`${this.toString()} 🛻 auuuuuaa`)
    }
}

class Moto extends Vehicle {
    constructor(brand: string, model: string) {
        super(brand, model)
    }

    start(): void {
        console.log(`${this.toString()} 🛵 bem bem bem beeeeeeemmmm beeemmmm`)
    }

    stop(): void {
        console.log(`${this.toString()} 🛵 bom bom bom bom bom`)
    }

    beep(): void {
        console.log(`${this.toString()} 🛵 beep beeeep`)
    }
}

const fiat500 = new Car('Fiat', '500')

const lamboDiablo = new Car('Lamborgini', 'Diablo')

const scania5000 = new Truck('Scania', '5000')

const vespa125 = new Moto('Vespa', '125')

const vehicles: IVehicle[] = [fiat500, lamboDiablo, scania5000, vespa125]

vehicles.forEach((vehicle: IVehicle) => vehicle.start())