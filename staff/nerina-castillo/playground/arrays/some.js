console.log("TEST some");

console.log("CASE some");

var numbers = [1, 2, 3, 4, 5];

var even = (element) => element % 2 === 0;

console.log(
  numbers.some(function (number) {
    return number > 3;
  })
);
