//contrato comun que se debe cumplir  - cualquier clase que se declare tendra los metodos flavor y scoops, las interfaces no proporcionan implementacion

interface IIceCream {
    flavor(): void,
    scoops(): void
}

// metodos comunes que pueden ser compartidos por todas las clases derivadas, plantilla para reutilizar codigo
abstract class IceCream implements IIceCream {
    flavor: string
    scoops: string

    constructor(flavor: string, scoops: string) {
        this.flavor = flavor
        this.scoops = scoops
    }

    abstract flavor(): void

    abstract scoops(): void

    toString() {
        return `${this.flavor} ${this.scoops}`
    }
}

class Conos extends IceCream {
    constructor(flavor: string, scoops: string) {
        super(flavor, scoops)
    }

    flavor(): void {
        console.log(`${this.toString()}🍦 vainilla`)
    }
    scoops(): void {
        console.log(`${this.toString()} 🍨🍨 two`)
    }

}

class Tarrina extends IceCream {
    constructor(flavor: string, scoops: number) {
        super(flavor, scoops)

        flavor(): void {
            console.log(`${this.toString()}🍨 chocolate`)
        }
        scoops(): void {
            console.log(`${this.toString()} 🍨 one`)
        }
    }
}

const conoVainilla = new Conos('vainilla', 'two')
conoVainilla.flavor()

const tarrina = new Tarrina('chocolate', 'one')
tarrina.scoops()