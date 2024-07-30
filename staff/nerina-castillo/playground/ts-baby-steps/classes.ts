export class Vehicle {
    protected brand: string;
    protected model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    public start() {
        console.log(`${this.brand} ${this.model} is starting.`);
    }

    public stop() {
        console.log(`${this.brand} ${this.model} is stopping.`);
    }
}

