console.info("TEST Array.prototype.reverse");

console.info("CASE reverse elements from Array");

var fruits = new Array();

var fruits = ["apple", "pear", "cherry", "watermelon"];

var reversed = fruits.reverse();

console.assert(fruits[0] === "watermelon", "fruits at 0 is watermelon");
console.assert(fruits[1] === "cherry", "fruits at 1 is cherry");
console.assert(fruits[2] === "pear", "fruits at 2 is pear");
console.assert(fruits[3] === "apple", "fruits at 3 is apple");
