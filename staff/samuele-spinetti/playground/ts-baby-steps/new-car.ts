// Interface with an optional property

interface Car {
    brand: string,
    model: string,
    year?: number
}

const myCar: Car = {
    brand: "Toyota",
    model: "Corolla",
};

console.log(myCar)