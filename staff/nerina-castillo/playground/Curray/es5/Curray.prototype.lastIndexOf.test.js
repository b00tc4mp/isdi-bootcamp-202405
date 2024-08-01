var Curray = require("./Curray");
require("./Curray.prototype.lastIndexOf");

console.info("TEST Curray.prototype.lastIndexOf");

console.info("CASE lastIndexOf in Curray");

var animals = new Curray();

animals[0] = "Dodo";
animals[1] = "Tiger";
animals[2] = "Lion";
animals[3] = "Dodo";
animals.length = 4;

var animalIndex = animals.indexOf("Tiger");

console.assert(animalIndex === 1, "animalIndex is 1");

var animalIndex = animals.indexOf("Lion", 2);

console.assert(animalIndex === 2, "animalIndex is 2");

var animalIndex = animals.indexOf("Lion", -2);

console.assert(animalIndex === 2, "animalIndex is 2");
