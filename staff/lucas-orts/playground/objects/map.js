var numbers = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }
numbers.map = function (callbackFn) {
    var newObject = { length: 0 }
    for (var i = 0; i < this.length; i++) {

        newObject[newObject.length++] = callbackFn(this[i], i, this)

    }
    return newObject
}

const map1 = numbers.map((x) => x + 3);

console.log(map1);
// Expected output: Array [4, 7, 12, 19]