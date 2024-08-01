console.info("TEST some");

console.info("CASE some");

var numbers = [1, 2, 3, 4, 5];

var even = (element) => element % 2 === 0;

console.info(
  numbers.some(function (number) {
    return number > 3;
  })
);
