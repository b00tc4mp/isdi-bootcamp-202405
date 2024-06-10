console.info("TEST concat");

console.info("CASE concat elements from two arrays");

var chars1 = ["a", "b", "c"];
var chars2 = ["d", "e", "f"];
var chars3 = chars1.concat(chars2);

console.info(chars1);

console.info(chars2);

console.info(chars3);

var chars3 = chars1.concat(chars2);

console.info(chars3);

console.info("CASE concat elements from 5 arrays");

var num1 = [10, 20, 30];
var num2 = [400, 500];
var num3 = [-60, -70];
var num4 = [800, 900];
var num5 = [-1000];

var num6 = num1.concat(num2, num3, num4, num5);

console.info(num1);
console.info(num2);
console.info(num3);
console.info(num4);
console.info(num5);
console.info(num6);
