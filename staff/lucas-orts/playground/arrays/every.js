var isBelowThreshold = function (currentValue) {
    return currentValue > 3;
}

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: false
