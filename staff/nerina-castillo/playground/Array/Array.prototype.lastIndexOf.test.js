console.info("TEST Array.prototype.lastIndexOf");

console.info("CASE lastIndexOf in Array");

var animals = new Array();

var animals = ["Dodo", "Tiger", "Lion", "Dodo"];

var animalIndex = animals.indexOf("Tiger");

console.assert(animalIndex === 1, "animalIndex is 1");

var animalIndex = animals.indexOf("Lion", 2);

console.assert(animalIndex === 2, "animalIndex is 2");

var animalIndex = animals.indexOf("Lion", -2);

console.assert(animalIndex === 2, "animalIndex is 2");
