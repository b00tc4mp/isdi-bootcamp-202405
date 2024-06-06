console.log("TEST includes");

console.log("CASE if an array has an element");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Deedee");
console.log(music);

console.log("CASE if an array has an element from index");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Marky", 2);
console.log(music);

var music = ramones.includes("Johnny", 1);
console.log(music);

var music = ramones.includes("Johnny");
console.log(music);

var music = ramones.includes("Johnny", undefined);
console.log(music);

var music = ramones.includes("Johnny", -4);
console.log(music);

var music = ramones.includes("Johnny", -15);
console.log(music);
