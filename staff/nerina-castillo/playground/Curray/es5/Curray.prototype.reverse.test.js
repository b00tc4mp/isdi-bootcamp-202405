var Curray = require("./Curray");
require("./Curray.prototype.reverse");

console.info("TEST Curray.prototype.reverse");

console.info("CASE reverse elements from Curray");

var fruits = new Curray();
fruits[0] = "apple";
fruits[1] = "pear";
fruits[2] = "cherry";
fruits[3] = "watermelon";
fruits.length = 4;

var reversed = fruits.reverse();

console.assert(fruits[0] === "watermelon", "fruits at 0 is watermelon");
console.assert(fruits[1] === "cherry", "fruits at 1 is cherry");
console.assert(fruits[2] === "pear", "fruits at 2 is pear");
console.assert(fruits[3] === "apple", "fruits at 3 is apple");
