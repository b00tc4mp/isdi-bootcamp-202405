var Curray = require("./Curray");
require("./Curray.prototype.copyWithin");

console.info("TEST Curray.prototype.copyWithin");

console.info("CASE copyWithin in Curray");

var letters = new Curray();
letters[0] = "a";
letters[1] = "b";
letters[2] = "c";
letters[3] = "d";
letters[4] = "e";
letters.length = 5;

var changeLetters = letters.copyWithin(0, 3, 4);

console.assert(changeLetters[0] === "d", "changeLetters at 0 is d");
console.assert(changeLetters[1] === "b", "changeLetters at 1 is b");
console.assert(changeLetters[2] === "c", "changeLetters at 2 is c");
console.assert(changeLetters[3] === "d", "changeLetters at 3 is d");
console.assert(changeLetters[4] === "e", "changeLetters at 4 is e");
console.assert(changeLetters.length === 5, "changeLetters length is 5");
