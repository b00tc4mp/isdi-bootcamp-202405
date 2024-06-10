var Curray = require("./Curray");
require("./Curray.prototype.filter");

console.info("TEST Curray.prototype.filter");

console.info("CASE filter from Curray");

var words = new Curray("spray", "elite", "exuberant", "destruction", "present");

var result = function (word) {
  return word.length > 6;
};

var filteredWords = words.filter(result);

console.assert(
  filteredWords[0] === "exuberant",
  "filteredWords at 0 is exuberant"
);
console.assert(
  filteredWords[1] === "destruction",
  "filteredWords at 1 is destruction"
);
console.assert(filteredWords[2] === "present", "filteredWords at 2 is present");
console.assert(filteredWords.length === 3, "filteredWords length is 3");
