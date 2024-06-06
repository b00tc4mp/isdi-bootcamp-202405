console.log("TEST lastIndexOf");

console.log("CASE lastIndexOf in array");

var animals = ["Dodo", "Tiger", "Lion", "Dodo"];

var animalIndex = animals.indexOf("Tiger");

console.log(animalIndex);

var animalIndex = animals.indexOf("Lion", 2);

console.log(animalIndex);

var animalIndex = animals.indexOf("Lion", -2);

console.log(animalIndex);
