

import { Vehicle } from './classes.js';

export class Car extends Vehicle {
    private numberOfDoors: number;

    constructor(brand: string, model: string, numberOfDoors: number) {
        super(brand, model);  // Llama al constructor de la clase base
        this.numberOfDoors = numberOfDoors;
    }

    public openTrunk() {
        console.log(`Opening trunk of ${this.brand} ${this.model}.`);
    }
}

const myCar = new Car('Toyota', 'Corolla', 4);
myCar.start();
myCar.stop();