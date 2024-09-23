console.info("TEST Array.prototype.findIndex")

console.info("CASE findIndex in Array")

var numbers = [5, 12, 8, 130, 44]

var found = numbers.findIndex(function (element) {
    return element > 13
})
console.assert(found === 3, "found is 3")

var found1 = numbers.findIndex(function (element) {
    return element < 2
})
console.assert(found1 === -1, "found1 is -1")