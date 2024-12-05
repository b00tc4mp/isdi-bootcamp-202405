var Curray = require("./Curray")
require("./Curray.prototype.at")

console.info("TEST Curray.prototype.at")

console.info("CASE element a positive index")

var nums = new Curray(5, 12, 8, 130, 44)

var num = nums.at(3)

console.assert(num === 130, "num is 130")

var num = nums.at(0)

console.assert(num === 5, "num is 5")

console.info("CASE element in negative index")

var num = nums.at(-3)

console.assert(num === 8, "num is 8")

console.info("CASE element a positive index grater than length")

var num = nums.at(100)

console.assert(num === undefined, "num is undefined")

console.info("CASE element a negative index grater than -length")

var num = nums.at(-100)

console.assert(num === undefined, "num is undefined")