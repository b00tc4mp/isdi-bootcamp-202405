console.log("TEST Array.prototype.shift");

console.log("CASE remove first element from array");

var societyOfSnow = [
  "Numa Turcatti",
  "Roberto Canessa",
  "Nando Parrado",
  "Eduardo Strauch",
];
console.assert(
  societyOfSnow[0] === "Numa Turcatti",
  "societyOfSnow at 0 is Numa Turcatti"
);
console.assert(
  societyOfSnow[1] === "Roberto Canessa",
  "societyOfSnow at 1 is Roberto Canesa"
);
console.assert(
  societyOfSnow[2] === "Nando Parrado",
  "societyOfSnow at 2 is Nando Parrado"
);
console.assert(
  societyOfSnow[3] === "Eduardo Strauch",
  "societyOfSnow at 3 is Eduardo Strauch"
);

var removed = societyOfSnow.shift();

console.assert(removed === "Numa Turcatti", "removed is Numa Turcatti");
console.assert(
  societyOfSnow[0] === "Roberto Canessa",
  "societyOfSnow at 0 is Roberto Canesa"
);
console.assert(
  societyOfSnow[1] === "Nando Parrado",
  "societyOfSnow at 1 is Nando Parrado"
);
console.assert(
  societyOfSnow[2] === "Eduardo Strauch",
  "societyOfSnow at 2 is Eduardo Strauch"
);
console.assert(societyOfSnow.length === 3, "societyOfSnow length is 3");
