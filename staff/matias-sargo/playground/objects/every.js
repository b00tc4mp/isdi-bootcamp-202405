console.log("TEST all elements with every in objects")


var isBelowThreshold = (currentValue) => currentValue < 40;

var nums = { 0: 1, 1: 30, 2: 39, 3: 29, 4: 10, 5: 13, length: 6 };

nums.every = function (callbackfunction) {
    for (i = 0; i < this.length; i++) {
        if (callbackfunction(this[i]) === false)
            return false;

    }
    return true;
}

console.log(nums.every(isBelowThreshold));
// Expected output: true
