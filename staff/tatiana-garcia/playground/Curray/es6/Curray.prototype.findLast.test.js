var Curray = require("./Curray")

console.info("TEST Curray.prototype.findLast")

console.info("CASE findLast in curray")

const numbers = new Curray(5, 12, 8, 130, 44)

const found = numbers.findLast(function (element) {
    return element > 13
})
console.assert(found === 44, "found is 44")

const found1 = numbers.findLast(function (element) {
    return element < 2
})
console.assert(found1 === undefined, "found1 is undefined")