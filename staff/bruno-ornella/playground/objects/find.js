console.log('TEST find')

console.log('CASE find')

const array1 = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };

array1.find = function (callBlackFuction) {
    for (var i = 0; i < this.length; i++) {
        if (callBlackFuction(this[i], i, this))
            return this[i]
    }
    return undefined
}


var found = array1.find((element) => element > 10)

console.log(found);
// Expected output: 12
