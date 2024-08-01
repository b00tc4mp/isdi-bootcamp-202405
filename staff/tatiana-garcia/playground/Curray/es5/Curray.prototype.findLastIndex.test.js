var Curray = require("./Curray")
require("./Curray.prototype.findLastIndex")

console.info("TEST Curray.prototype.findLastIndex")

console.info("CASE findLastIndex in curray")

var numbers = new Curray(5, 12, 8, 130, 44)

var found = numbers.findLastIndex(function (element) {
    return element > 13
})
console.assert(found === 4, "found is 4")

var found1 = numbers.findLastIndex(function (element) {
    return element < 2
})
console.assert(found1 === -1, "found1 is undefined")