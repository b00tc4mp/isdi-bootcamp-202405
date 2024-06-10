console.info("TEST shift");

console.info("CASE remove first element from object");

var societyOfTheSnow = {
  0: "Numa Turcatti",
  1: "Roberto Canessa",
  2: "Nando Parrado",
  3: "Eduardo Strauch",
  length: 4,
};
console.info(societyOfTheSnow);

societyOfTheSnow.shift = function () {
  var element = this[0];
  for (i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }

  delete this[this.length - 1];
  this.length--;
  return element;
};

var removed = societyOfTheSnow.shift();

console.info(removed);
console.info(societyOfTheSnow);
console.info(societyOfTheSnow.length);
