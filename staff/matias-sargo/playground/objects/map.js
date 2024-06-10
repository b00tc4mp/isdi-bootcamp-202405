console.log("TEST map in objects")

var numbers = [1, 4, 9, 16];

numbers.map = function (callbackfunction) {
    var newObject = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        callbackfunction(this[1], i, this)
        newObject[newObject.length++] = callbackfunction(this[i], i,)
    }

    return newObject
}

// Pass a function to map
var map1 = numbers.map((x) => x * 2)

console.log(map1);
// Expected output: Array [2, 8, 18, 32]