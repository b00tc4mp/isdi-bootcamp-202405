console.info("TEST includes");

console.info("CASE if an array has an element");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Deedee");
console.info(music);

console.info("CASE if an array has an element from index");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Marky", 2);
console.info(music);

var music = ramones.includes("Johnny", 1);
console.info(music);

var music = ramones.includes("Johnny");
console.info(music);

var music = ramones.includes("Johnny", undefined);
console.info(music);

var music = ramones.includes("Johnny", -4);
console.info(music);

var music = ramones.includes("Johnny", -15);
console.info(music);
