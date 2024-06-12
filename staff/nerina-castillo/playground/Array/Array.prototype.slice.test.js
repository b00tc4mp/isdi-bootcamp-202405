console.info("TEST Array.prototype.slice");

console.info("CASE slice from Array");

var names = new Array();

var names = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];

var male = names.slice(1, 3);

console.assert(male[0] === "Pedro", "male at 0 is Pedro");
console.assert(male[1] === "Miguel", "male at 1 is Miguel");
console.assert(male.length === 2, "male length is 2");
