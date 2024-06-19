const Curray = require("./Curray");
require("./Curray.prototype.concat");

console.log("TEST Curray.prototype.concat");

console.log("CASE concat elements from two Currays");

const chars1 = new Curray();
const chars2 = new Curray();

chars1[0] = "a";
chars1[1] = "b";
chars1[2] = "c";
chars2[0] = "d";
chars2[1] = "e";
chars2[2] = "f";
chars1.length = 3;
chars2.length = 3;

const chars3 = chars1.concat(chars2);

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

const nums1 = new Curray();
const nums2 = new Curray();
const nums3 = new Curray();
const nums4 = new Curray();
const nums5 = new Curray();

nums1[0] = 10;
nums1[1] = 20;
nums1[2] = 30;
nums1.length = 3;
nums2[0] = 400;
nums2[1] = 500;
nums2.length = 2;
nums3[0] = -60;
nums3[1] = -70;
nums3.length = 2;
nums4[0] = 800;
nums4[1] = 900;
nums4.length = 2;
nums5[0] = -1000;
nums5.length = 1;

const num6 = nums1.concat(nums2, nums3, nums4, nums5);

console.assert(nums1[0] === 10, "num1 at 0 is 10");
console.assert(nums1[1] === 20, "num1 at 1 is 20");
console.assert(nums1[2] === 20, "num1 at 2 is 30");
console.assert(nums2[0] === 400, "num2 at 0 is 400");
console.assert(nums2[1] === 500, "num2 at 1 is 500");
console.assert(nums3[0] === -60, "num3 at 0 is -60");
console.assert(nums3[1] === -70, "num3 at 1 is -70");
console.assert(nums4[0] === 800, "num4 at 0 is 900");
console.assert(nums4[2] === 900, "num4 at 1 is 900");
console.assert(nums5[0] === -1000, "num5 at 0 is -1000");
console.assert(num6.length === 10, "nums6 length is 10");