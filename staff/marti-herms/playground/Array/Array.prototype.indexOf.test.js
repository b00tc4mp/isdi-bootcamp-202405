console.log("TEST Array.prototype.indexOf");

console.log("CASE index of  cat in Array");

var cats = new Array();

var cats = ["Gris", "Lemmy", "Ozzy", "Trici", "Gris"];
var catsIndex = cats.indexOf("Gris");

console.assert(catsIndex === 0, "catsIndex is 0");

console.log("CASE index of cat in Array of from index");

var catsIndex = cats.indexOf("Gris", 2);
console.assert(catsIndex === 4, "castIndex is 4");