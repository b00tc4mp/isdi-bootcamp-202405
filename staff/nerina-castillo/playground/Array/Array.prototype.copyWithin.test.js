console.info("TEST Array.prototype.copyWithin");

console.info("CASE copyWithin in Array");

var letters = new Array();

var letters = ["a", "b", "c", "d", "e"];

var changeLetters = letters.copyWithin(0, 3, 4);

console.assert(changeLetters[0] === "d", "changeLetters at 0 is d");
console.assert(changeLetters[1] === "b", "changeLetters at 1 is b");
console.assert(changeLetters[2] === "c", "changeLetters at 2 is c");
console.assert(changeLetters[3] === "d", "changeLetters at 3 is d");
console.assert(changeLetters[4] === "e", "changeLetters at 4 is e");
console.assert(changeLetters.length === 5, "changeLetters length is 5");
