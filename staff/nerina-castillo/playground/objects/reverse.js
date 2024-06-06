console.log("TEST reverse");

console.log("CASE reverse elements from objects");

const fruits = {
  0: "apple",
  1: "pear",
  2: "cherry",
  3: "watermelon",
  length: 4,
};
console.log(fruits);

fruits.reverse = function () {
  var tmp;
  for (var i = 0; i < this.length - i; i++) {
    tmp = this[i];
    this[i] = this[this.length - i - 1];
    this[this.length - i - 1] = tmp;
  }

  return this;
};

const reversed = fruits.reverse();
console.log(reversed);
