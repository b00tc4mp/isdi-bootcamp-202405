var Curray = require("./Curray");
require("./Curray.prototype.pop");

console.info("TEST Curray.prototype.pop");

console.info("CASE remove last element from Curray");

var cars = new Curray();

cars[0] = { branch: "ferrari", model: "gta", year: 1990 };
cars[1] = { branch: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { branch: "fiat", model: "500", year: 2017 };
cars[3] = { branch: "ford", model: "fiesta", year: 2005 };
cars.length = 4;

var car1 = cars[0];
var car2 = cars[1];
var car3 = cars[2];

var last = cars.pop();

console.assert(cars.length === 2, "cars length is 2");
console.assert(
  car1 === cars[0],
  "car1 is { brand: ferrari, model: gto, year: 1990 }"
);
console.assert(
  car2 === cars[1],
  "car2 is { brand: lamborghini, model: murcielago, year: 2010 }"
);
console.assert(
  car3 === last,
  "car3 is { brand: fiat, model: 500, year: 2017 }"
);
