console.log("TEST concat");

console.log("CASE concat elements from two arrays");

var chars1 = ["a", "b", "c"];
var chars2 = ["d", "e", "f"];
var chars3 = chars1.concat(chars2);

console.log(chars1);

console.log(chars2);

console.log(chars3);

var chars3 = chars1.concat(chars2);

console.log(chars3);

console.log("CASE concat elements from 5 arrays");

var num1 = [10, 20, 30];
var num2 = [400, 500];
var num3 = [-60, -70];
var num4 = [800, 900];
var num5 = [-1000];

var num6 = num1.concat(num2, num3, num4, num5);

console.log(num1);
console.log(num2);
console.log(num3);
console.log(num4);
console.log(num5);
console.log(num6);
