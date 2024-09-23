console.log('TEST some');

console.log('CASE check if function is true for any object property');

var object = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 };

object.some = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (callbackFn(this[i])) {
            return true;
        }
    }
    return false;
}

var even = (element) => element % 2 === 0;

console.log(object.some(even));
//true

object = { 0: 1, 1: 3, 2: 5, 3: 7, length: 4 };

object.some = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (callbackFn(this[i])) {
            return true;
        }
    }
    return false;
}

console.log(object.some(even));
//false