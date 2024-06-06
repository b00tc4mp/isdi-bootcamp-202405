console.log("TEST Array.prototype.join");

console.log("CASE join elements in a string");

var elements = ["Fire", "Air", "Water"];

var joinedElements = elements.join();
var joined = "Fire,Air,Water";

console.assert(joinedElements === joined, "joinedElements is equal to join");

console.log("CASE join elements with separator");

var joinedWithSeparator = elements.join(" $ ");
var joined2 = "Fire $ Air $ Water";

console.assert(
  joinedWithSeparator === joined2,
  "joinedWtihSeparator is equal to joined2"
);

console.log("CASE join elements without separator");

var joinedWithoutSeparator = elements.join();
var joined3 = "Fire,Air,Water";

console.assert(
  joinedWithoutSeparator === joined3,
  "joinedWithoutSeparator is equal to joined3"
);

var joinjoinedWithoutSeparatored = elements.join(undefined);
console.assert(
  joinedWithoutSeparator === joined3,
  "joinedWithoutSeparator is equal to joined3-"
);
