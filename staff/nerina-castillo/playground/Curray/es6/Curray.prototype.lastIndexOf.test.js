const Curray = require("./Curray");

console.info("TEST Curray.prototype.lastIndexOf");

console.info("CASE lastIndexOf in Curray");
{
  const animals = new Curray();

  animals[0] = "Dodo";
  animals[1] = "Tiger";
  animals[2] = "Lion";
  animals[3] = "Dodo";
  animals.length = 4;

  const animalIndex = animals.indexOf("Tiger");

  console.assert(animalIndex === 1, "animalIndex is 1");
}
{
  const animals = new Curray();

  animals[0] = "Dodo";
  animals[1] = "Tiger";
  animals[2] = "Lion";
  animals[3] = "Dodo";
  animals.length = 4;
  const animalIndex = animals.indexOf("Lion", 2);

  console.assert(animalIndex === 2, "animalIndex is 2");
}
{
  const animals = new Curray();

  animals[0] = "Dodo";
  animals[1] = "Tiger";
  animals[2] = "Lion";
  animals[3] = "Dodo";
  animals.length = 4;
  const animalIndex = animals.indexOf("Lion", -2);

  console.assert(animalIndex === 2, "animalIndex is 2");
}
