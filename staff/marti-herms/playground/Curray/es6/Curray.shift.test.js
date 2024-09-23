const Curray = require("./Curray");
require("./Curray.prototype.shift");

console.log("TEST Curray.prototype.shift");

console.log("CASE shift in Curray");

const societyOfSnow = new Curray();

societyOfSnow[0] = "Numa Turcatti";
societyOfSnow[1] = "Roberto Canessa";
societyOfSnow[2] = "Nando Parrado";
societyOfSnow[3] = "Eduardo Strauch";
societyOfSnow.length = 4;

console.assert(societyOfSnow[0] === "Numa Turcatti", "societyOfSnow at 0 is Numa Turcatti");
console.assert(societyOfSnow[1] === "Roberto Canessa", "societyOfSnow at 1 is Roberto Canesa");
console.assert(societyOfSnow[2] === "Nando Parrado", "societyOfSnow at 2 is Nando Parrado");
console.assert(societyOfSnow[3] === "Eduardo Strauch", "societyOfSnow at 3 is Eduardo Strauch");
console.assert(societyOfSnow.length === 4, "societyOfSnow length is 4");

const removed = societyOfSnow.shift();

console.assert(removed === "Numa Turcatti", "removed is Numa Turcatti");
console.assert(societyOfSnow[0] === "Roberto Canessa", "societyOfSnow at 0 is Roberto Canesa");
console.assert(societyOfSnow[1] === "Nando Parrado", "societyOfSnow at 1 is Nando Parrado");
console.assert(societyOfSnow[2] === "Eduardo Strauch", "societyOfSnow at 2 is Eduardo Strauch");
console.assert(societyOfSnow.length === 3, "societyOfSnow length is 3");