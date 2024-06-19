const Curray = require("./Curray");
require("./Curray.prototype.join");

console.log("TEST Curray.prototype.join");

console.log("CASE join elements in a string");

const elements = new Curray();
elements[0] = "Fire";
elements[1] = "Air";
elements[2] = "Water";
elements.length = 3;

const joinedElements = elements.join();
const joined = "Fire,Air,Water";

console.assert(joinedElements === joined, "joinedElements is equal to join");

console.log("CASE join elements with separator");

const joinedWithSeparator = elements.join(" $ ");
const joined2 = "Fire $ Air $ Water";

console.assert(joinedWithSeparator === joined2, "joinedWtihSeparator is equal to joined2");

console.log("CASE join elements without separator");

const joinedWithoutSeparator1 = elements.join();
const joined3 = "Fire,Air,Water";

console.assert(joinedWithoutSeparator1 === joined3, "joinedWithoutSeparator is equal to joined3");

const joinedWithoutSeparator2 = elements.join(undefined);
console.assert(joinedWithoutSeparator2 === joined3, "joinedWithoutSeparator is equal to joined3-");