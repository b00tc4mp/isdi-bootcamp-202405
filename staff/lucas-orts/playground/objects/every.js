var num = { 0: 1, 1: 30, 2: 39, 3: 29, 4: 10, 5: 13, length: 6 };

num.every = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        //if (callbackFn(this[i])=== false)
        if (!callbackFn(this[i]))
            return false

    }
    return true
}

var isBelowThreshold = num.every(function (currentValue) {

    return currentValue > 3;
})
console.log(isBelowThreshold);
// Expected output: 
