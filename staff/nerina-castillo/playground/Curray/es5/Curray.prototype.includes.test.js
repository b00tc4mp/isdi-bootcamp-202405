var Curray = require("./Curray");
require("./Curray.prototype.includes");

console.info("TEST Curray.prototype.includes.test");

console.info("CASE if an Curray has an element");

var ramones = new Curray();
ramones[0] = "Yoey";
ramones[1] = "Deedee";
ramones[2] = "Johnny";
ramones[3] = "Marky";
ramones.length = 4;

var music = ramones.includes("Deedee");
console.assert(music === true, "music is true");

console.info("CASE if an Curray has an element from index");

var ramones = new Curray();
ramones[0] = "Yoey";
ramones[1] = "Deedee";
ramones[2] = "Johnny";
ramones[3] = "Marky";
ramones.length = 4;

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
