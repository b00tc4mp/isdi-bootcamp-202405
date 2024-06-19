const Curray = require("./Curray");

console.info("TEST Curray.prototype.indexOf");

console.info("CASE index of  cat in Curray");
{
  const cats = new Curray();
  cats[0] = "Gris";
  cats[1] = "Lemmy";
  cats[2] = "Ozzy";
  cats[3] = "Trici";
  cats[4] = "Gris";
  cats.length = 5;

  const catsIndex = cats.indexOf("Gris");

  console.assert(catsIndex === 0, "catsIndex is 0");
}
console.info("CASE index of cat in Curray of from index");
{
  const cats = new Curray();
  cats[0] = "Gris";
  cats[1] = "Lemmy";
  cats[2] = "Ozzy";
  cats[3] = "Trici";
  cats[4] = "Gris";
  cats.length = 5;
  const catsIndex = cats.indexOf("Gris", 2);
  console.assert(catsIndex === 4, "castIndex is 4");
}
