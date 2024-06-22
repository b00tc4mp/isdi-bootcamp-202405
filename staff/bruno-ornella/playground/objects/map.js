

var numebers = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

numebers.map = function (callBlackFuction) {
    var newObject = { length: 0 }
    for (var i = 0; i < this.length; i++) {

        newObject[newObject.length++] = callBlackFuction(this[i], i, this)

    }
    return newObject
}

var map1 = numebers.map((x) => x + 3)
console.log(map1)