console.log("TEST pop");

console.log("CASE remove last element from object with .pop()");

var cars = new Object();
cars[0] = { branch: "ferrari", model: "gta", year: 1990 };
cars[1] = { branch: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { branch: "fiat", model: "500", year: 2017 };
cars[3] = { branch: "ford", model: "fiesta", year: 2005 };
cars.length = 4;

console.log(cars);
console.log(cars.length);

cars.pop = function () {
  if (this.length > 0) {
    var element = this[this.length - 1];
    delete this[--this.length];

    return element;
  }
  return undefined;
};
console.log(cars.pop());

console.log(cars);
console.log(cars.length);
