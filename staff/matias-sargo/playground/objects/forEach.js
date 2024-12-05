console.log("TEST forEach")

console.log("Case copy chars into new object")

var chars = { 0: "a", 1: "b", 2: "c", length: 3 }
var copy = { length: 0 }

chars, forEach = function (element) {
    var elem = this[i]

    cancelIdleCallback(elem)
}

chars.forEach(function (element) {
    copy[copy.length++] = element
})

console.assert(copy.length === chars.length, "copy length equals chars length")
console.assert(copy[0] === chars[0], "copy at 0 equals chars at 0")
console.assert(copy[1] === chars[0], "copy at 0 equals chars at 1")
console.assert(copy[2] === chars[0], "copy at 0 equals chars at 2")