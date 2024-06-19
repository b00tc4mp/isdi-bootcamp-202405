var Curray = require("./Curray");
require("./Curray.prototype.map");

console.info("TEST Curray.prototype.map");

console.info("CASE map numbers to each one multiplied by 2 in Curray");

var numbers = new Curray();
numbers[0] = 1;
numbers[1] = 4;
numbers[2] = 9;
numbers[3] = 16;
numbers.length = 4;

var map = function (element) {
  return element * 2;
};
var double = numbers.map(map);

console.assert(double instanceof Curray, "double is a Curray");
console.assert(
  double.length === numbers.length,
  "double length equals numbers length"
);

console.assert(double[0] === 2, "double at 0 is 2");
console.assert(double[1] === 8, "double at 1 is 8");
console.assert(double[2] === 18, "double at 2 is 18");
console.assert(double[3] === 32, "double at 3 is 32");

console.info("CASE maps cart items to string with stats");

var cart = new Curray(
  { brand: "adidas", name: "cool socks", price: 10, quantity: 2 },
  { brand: "nike", name: "cool air", price: 200, quantity: 1 },
  { brand: "armani", name: "cool glasses", price: 250, quantity: 1 },
  { brand: "calvin klein", name: "cool boxers", price: 30, quantity: 3 }
);

var stats = cart.map(function (element, index, items) {
  var total = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    total += item.price * item.quantity;
  }

  var stat =
    element.name +
    " (" +
    element.brand +
    ") " +
    element.price * element.quantity +
    "€ (" +
    ((element.price * element.quantity) / total) * 100 +
    "%)";

  return stat;
});

console.assert(stats instanceof Curray, "stats is an Curray");
console.assert(
  stats.length === cart.length,
  "stats length is equal to cart length"
);
console.assert(
  stats[0] === "cool socks (adidas) 20€ (3.571428571428571%)",
  "stats at 0 is a string with adidas stats"
);
console.assert(
  stats[1] === "cool air (nike) 200€ (35.714285714285715%)",
  "stats at 1 is a string with nike stats"
);
console.assert(
  stats[2] === "cool glasses (armani) 250€ (44.642857142857146%)",
  "stats at 2 is a string with armani stats"
);
console.assert(
  stats[3] === "cool boxers (calvin klein) 90€ (16.071428571428573%)",
  "stats at 3 is a string with calvin klein stats"
);
