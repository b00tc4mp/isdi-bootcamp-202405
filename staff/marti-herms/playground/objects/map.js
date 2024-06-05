console.log('TEST map');

console.log('CASE test 1');

var object1 = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };

object1.map = function (callbackFn) {
    var newObject = { length: 0 };
    for (var i = 0; i < this.length; i++) {
        newObject[newObject.length++] = callbackFn(this[i], i, this);
    }
    return newObject;
}

var map1 = object1.map((x) => x * 2);

console.log(map1);
//{ 0: 2, 1: 8, 2: 18, 3: 32, length: 4}

console.log('CASE test 2');

var object1 = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };

object1.map = function (callbackFn) {
    var newObject = { length: 0 };
    for (var i = 0; i < this.length; i++) {
        newObject[newObject.length++] = callbackFn(this[i], i, this);
    }
    return newObject;
}

var map1 = object1.map((x, index) => x * index * 2);

console.log(map1);
//{ '0': 0, '1': 8, '2': 36, '3': 96, length: 4 }