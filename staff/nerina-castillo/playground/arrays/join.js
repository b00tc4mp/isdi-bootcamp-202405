console.info("TEST join");

console.info("CASE join elements in a string");

const elements = ["Fire", "Air", "Water"];

var joinedElements = elements.join();

console.info(joinedElements);

console.info("CASE join elements with separator");

var things = [
  true,
  "hello world",
  100,
  { name: "Oswald" },
  [10, 20, 30],
  function () {},
];
var joined = things.join(" $ ");

console.info(joined);

console.info("CASE join elements without separator");

var things = [
  true,
  "hello world",
  100,
  { name: "Oswald" },
  [10, 20, 30],
  function () {},
];
var joined = things.join();

console.info(joined);

var joined = things.join(undefined);

console.info(joined);

var joined = things.join("");

console.info(joined);
