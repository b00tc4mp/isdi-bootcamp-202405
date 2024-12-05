var numbers = [5, 12, 8, 130, 44];



var found = numbers.findIndex((element) => element > 13)


console.assert(found === 3, "found is 3")


var found = numbers.findIndex(function (element) {
    element > 2
})

console.assert(found === -1, "found is 3")
