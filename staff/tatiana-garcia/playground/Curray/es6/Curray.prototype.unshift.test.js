const Curray = require("./Curray")


console.info("TEST Curray.prototype.unshift")

console.info("CASE unshift an element in Curray")

const numbers = new Curray(1, 2, 3)

const nums = numbers.unshift(4, 5)

console.assert(nums === 5, "nums is 5")
console.assert(numbers[0] === 4, "nums at 0  is 4")
console.assert(numbers[1] === 5, "nums at 1  is 5")
console.assert(numbers[2] === 1, "nums at 2  is 1")
console.assert(numbers[3] === 2, "nums at 3  is 2")
console.assert(numbers[4] === 3, "nums at 4  is 3")
