console.log("CASE test element with some in object")

var nums = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 6 };

nums.some = function (callbackfunction) {
    for (var i = 0; i < this.length; i++) {

        if (callbackfunction(this[i]))

            return true
    }
}
return false;


// Checks whether an element is even
var even = (element) => element % 2 === 0;

console.log(nums.some(even));
// Expected output: true