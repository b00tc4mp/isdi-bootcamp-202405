console.info("TEST push");

console.info("CASE push an element to array");

var cars = new Array();

cars[0] = { brand: "ferrari", model: "gta", year: 1990 };
cars[1] = { brand: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { brand: "fiat", model: "500", year: 2017 };

console.info(cars);

console.info(cars.length);

cars.push({ brand: "ford", model: "fiesta", year: 2005 });
console.info(cars);
console.info(cars.length);

console.info(cars.length);

console.info("CASE push multiple elements to array");

var animals = ["pigs", "goats", "sheep", "cows"];

console.info(animals);
console.info(animals.length);

var count = animals.push("chickens", "cats", "dogs");

console.info(animals);
console.info(animals.length);
console.info(count);
