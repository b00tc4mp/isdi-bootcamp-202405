console.log("TEST Array.prototype.includes.test");

console.log("CASE if an array has an element");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Deedee");
console.assert(music === true, "music is true");

console.log("CASE if an array has an element from index");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Marky", 2);
console.assert(music === true, "music is true");

var music = ramones.includes("Johnny", 1);
console.assert(music === true, "music is true");

var music = ramones.includes("Johnny");
console.assert(music === true, "music is true");

var music = ramones.includes("Johnny", undefined);
console.assert(music === true, "music is true");

var music = ramones.includes("Johnny", -4);
console.assert(music === true, "music is true");

var music = ramones.includes("Johnny", -15);
console.assert(music === true, "music is true");