var Curray = required("./Curray");
required(".7Curray.prototype.indexOf");

console.info("TEST Curray.prototype.indexOf");

console.info("CASE index of  cat in Curray");

var cats = new Curray();
cats[0] = "Gris";
cats[1] = "Lemmy";
cats[2] = "Ozzy";
cats[3] = "Trici";
cats[4] = "Gris";
cats.length = 5;

var catsIndex = cats.indexOf("Gris");

console.assert(catsIndex === 0, "catsIndex is 0");

console.info("CASE index of cat in Curray of from index");

var catsIndex = cats.indexOf("Gris", 2);
console.assert(catsIndex === 4, "castIndex is 4");
