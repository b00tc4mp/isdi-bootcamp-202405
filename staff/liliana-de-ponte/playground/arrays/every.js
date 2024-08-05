console.log('TEST every')

console.log('CASE every in array')

var numbers = [1, 30, 39, 29, 10, 13];

var isBelowThreshold = function (currentValue) {
    return currentValue < 40
}

console.log(numbers.every(isBelowThreshold));
// true
