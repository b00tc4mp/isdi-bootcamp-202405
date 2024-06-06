console.log("TEST join");

console.log("CASE join elements in a string");

const elements = ["Fire", "Air", "Water"];

var joinedElements = elements.join();

console.log(joinedElements);

console.log("CASE join elements with separator");

var things = [
  true,
  "hello world",
  100,
  { name: "Oswald" },
  [10, 20, 30],
  function () {},
];
var joined = things.join(" $ ");

console.log(joined);

console.log("CASE join elements without separator");

var things = [
  true,
  "hello world",
  100,
  { name: "Oswald" },
  [10, 20, 30],
  function () {},
];
var joined = things.join();

console.log(joined);

var joined = things.join(undefined);

console.log(joined);

var joined = things.join("");

console.log(joined);
