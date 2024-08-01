const Curray = require("./Curray");

console.info("TEST Curray.prototype.join");

console.info("CASE join elements in a string");
{
  const elements = new Curray();
  elements[0] = "Fire";
  elements[1] = "Air";
  elements[2] = "Water";
  elements.length = 3;

  const joinedElements = elements.join();
  const joined = "Fire,Air,Water";

  console.assert(joinedElements === joined, "joinedElements is equal to join");
}
console.info("CASE join elements with separator");
{
  const elements = new Curray();
  elements[0] = "Fire";
  elements[1] = "Air";
  elements[2] = "Water";
  elements.length = 3;
  const joinedWithSeparator = elements.join(" $ ");
  const joined2 = "Fire $ Air $ Water";

  console.assert(
    joinedWithSeparator === joined2,
    "joinedWtihSeparator is equal to joined2"
  );
}
console.info("CASE join elements without separator");
{
  const elements = new Curray();
  elements[0] = "Fire";
  elements[1] = "Air";
  elements[2] = "Water";
  elements.length = 3;
  const joinedWithoutSeparator = elements.join();
  const joined3 = "Fire,Air,Water";

  console.assert(
    joinedWithoutSeparator === joined3,
    "joinedWithoutSeparator is equal to joined3"
  );
}
{
  const elements = new Curray();
  elements[0] = "Fire";
  elements[1] = "Air";
  elements[2] = "Water";
  elements.length = 3;
  const joinedWithoutSeparator = elements.join(undefined);
  const joined3 = "Fire,Air,Water";

  console.assert(
    joinedWithoutSeparator === joined3,
    "joinedWithoutSeparator is equal to joined3-"
  );
}
