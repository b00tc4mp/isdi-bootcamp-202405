console.info("TEST indexOf");

console.info("CASE index of  cat in array");
var cats = ["Gris", "Lemmy", "Ozzy", "Trici", "Gris"];
var catsIndex = cats.indexOf("Gris");

console.info(catsIndex);

console.info("CASE index of cat in array of from index");

var catsIndex = cats.indexOf("Gris", 2);
console.info(catsIndex);

//TODO implement case for copyWithin
console.info("CASE copyWithin");
var array1 = ["a", "b", "c", "d", "e"];

var array2 = array1.copyWithin(0, 3, 4);
console.info(array2);
console.info(array2);
