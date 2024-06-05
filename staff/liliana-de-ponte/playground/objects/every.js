console.log('TEST every')

console.log('CASE every in objects')

var numbers = { 0: 1, 1: 30, 2: 39, 3: 29, 4: 10, 5: 13, length: 6 };

numbers.every = function (callback) {
    for (var i = 0; i < this.length; i++) {
        // if (callback(this[i]) === false)
        if (!callback(this[i]))

            return false
    }
    return true
}

var isBelowThreshold = function (currentValue) {
    return currentValue < 40
}

console.log(numbers.every(isBelowThreshold));
// true
