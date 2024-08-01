const Curray = require("./Curray");

console.info("TEST Curray.prototype.includes.test");

console.info("CASE if an Curray has an element");
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;

  const music = ramones.includes("Deedee");
  console.assert(music === true, "music is true");
}
console.info("CASE if an Curray has an element from index");
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;

  const music = ramones.includes("Marky", 2);
  console.assert(music === true, "music is true1");
}
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;
  const music = ramones.includes("Johnny", 1);
  console.assert(music === true, "music is true2");
}
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;
  const music = ramones.includes("Johnny");
  console.assert(music === true, "music is true3");
}
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;
  const music = ramones.includes("Johnny", undefined);
  console.assert(music === true, "music is true4");
}
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;
  const music = ramones.includes("Johnny", -4);
  console.assert(music === true, "music is true5");
}
{
  const ramones = new Curray();
  ramones[0] = "Yoey";
  ramones[1] = "Deedee";
  ramones[2] = "Johnny";
  ramones[3] = "Marky";
  ramones.length = 4;
  const music = ramones.includes("Johnny", -15);
  console.assert(music === true, "music is true6");
}
