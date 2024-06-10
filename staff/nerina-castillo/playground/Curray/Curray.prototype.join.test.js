var Curray = require("./Curray");
require("./Curray.prototype.join");

console.info("TEST Curray.prototype.join");

console.info("CASE join elements in a string");

var elements = new Curray();
elements[0] = "Fire";
elements[1] = "Air";
elements[2] = "Water";
elements.length = 3;

var joinedElements = elements.join();
var joined = "Fire,Air,Water";

console.assert(joinedElements === joined, "joinedElements is equal to join");

console.info("CASE join elements with separator");

var joinedWithSeparator = elements.join(" $ ");
var joined2 = "Fire $ Air $ Water";

console.assert(
  joinedWithSeparator === joined2,
  "joinedWtihSeparator is equal to joined2"
);

console.info("CASE join elements without separator");

var joinedWithoutSeparator = elements.join();
var joined3 = "Fire,Air,Water";

console.assert(
  joinedWithoutSeparator === joined3,
  "joinedWithoutSeparator is equal to joined3"
);

var joinedWithoutSeparator = elements.join(undefined);
console.assert(
  joinedWithoutSeparator === joined3,
  "joinedWithoutSeparator is equal to joined3-"
);
