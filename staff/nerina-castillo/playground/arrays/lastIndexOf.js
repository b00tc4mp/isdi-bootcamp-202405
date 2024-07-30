console.info("TEST lastIndexOf");

console.info("CASE lastIndexOf in array");

var animals = ["Dodo", "Tiger", "Lion", "Dodo"];

var animalIndex = animals.indexOf("Tiger");

console.info(animalIndex);

var animalIndex = animals.indexOf("Lion", 2);

console.info(animalIndex);

var animalIndex = animals.indexOf("Lion", -2);

console.info(animalIndex);
