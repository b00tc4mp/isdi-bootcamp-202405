console.log('TEST find');

console.log('CASE test 1');

var object1 = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };

object1.find = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        if (callbackFn(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
}

var found = object1.find((element) => element > 10);

console.log(found);
//12