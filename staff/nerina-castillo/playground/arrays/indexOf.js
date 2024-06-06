console.log("TEST indexOf");

console.log("CASE index of  cat in array");
var cats = ["Gris", "Lemmy", "Ozzy", "Trici", "Gris"];
var catsIndex = cats.indexOf("Gris");

console.log(catsIndex);

console.log("CASE index of cat in array of from index");

var catsIndex = cats.indexOf("Gris", 2);
console.log(catsIndex);

//TODO implement case for copyWithin
console.log("CASE copyWithin");
var array1 = ["a", "b", "c", "d", "e"];

var array2 = array1.copyWithin(0, 3, 4);
console.log(array2);
console.log(array2);
