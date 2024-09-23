console.log('TEST every');

console.log('CASE check if function is true for every object property');

var object = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 };

object.some = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (!callbackFn(this[i])) {
            return false;
        }
    }
    return true;
}

var even = (element) => element % 2 === 0;

console.log(object.some(even));
//false

object = { 0: 2, 1: 4, 2: 6, 3: 8, length: 4 };

object.some = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (!callbackFn(this[i])) {
            return false;
        }
    }
    return true;
}

console.log(object.some(even));
//true