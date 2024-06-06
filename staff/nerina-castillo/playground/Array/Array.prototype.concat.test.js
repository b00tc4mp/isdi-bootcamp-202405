console.log("TEST Array.prototype.concat");

console.log("CASE concat elements from two arrays");

var chars1 = ["a", "b", "c"];
var chars2 = ["d", "e", "f"];

var chars3 = chars1.concat(chars2);

console.assert(chars1[0] === "a", "chars1 at 0 is a");
console.assert(chars1[1] === "b", "chars1 at 1 is b");
console.assert(chars1[2] === "c", "chars1 at 2 is c");
console.assert(chars1.length === 3, "chars1 length is 3");
console.assert(chars2[0] === "d", "chars1 at 0 is d");
console.assert(chars2[1] === "e", "chars1 at 1 is e");
console.assert(chars2[2] === "f", "chars1 at 2 is f");
console.assert(chars2.length === 3, "chars2 length is 3");
console.assert(chars3.length === 6, "chars3 length is 6");

console.log("CASE concat elements from 5 arrays");

var num1 = [10, 20, 30];
var num2 = [400, 500];
var num3 = [-60, -70];
var num4 = [800, 900];
var num5 = [-1000];

var num6 = num1.concat(num2, num3, num4, num5);

console.assert(num1[0] === 10, "num1 at 0 is 10");
console.assert(num1[1] === 20, "num1 at 1 is 20");
console.assert(num1[2] === 20, "num1 at 2 is 30");
console.assert(num2[0] === 400, "num2 at 0 is 400");
console.assert(num2[1] === 500, "num2 at 1 is 500");
console.assert(num3[0] === -60, "num3 at 0 is -60");
console.assert(num3[1] === -70, "num3 at 1 is -70");
console.assert(num4[0] === 800, "num4 at 0 is 900");
console.assert(num4[2] === 900, "num4 at 1 is 900");
console.assert(num5[0] === -1000, "num5 at 0 is -1000");
console.assert(nums6.length === 10, "nums6 length is 10");
