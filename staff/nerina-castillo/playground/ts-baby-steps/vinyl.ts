//class type

export class Record {
    protected name: string;
    protected year: number;

    constructor(name: string, year: number) {
        this.name = name;
        this.year = year;
    }

    public produce() {
        console.log(`The album ${this.name} was released in ${this.year} `);
    }

}

export class Vinyl extends Record {
    private rpm: number;

    constructor(name: string, year: number, rpm: number) {
        super(name, year);
        this.rpm = rpm;
    }

    public play() {
        console.log(`${this.name} plays at ${this.rpm} RPM.`);
    }
}

const myVinyl = new Vinyl('The Stooges', 1969, 45);
myVinyl.produce();
myVinyl.play()