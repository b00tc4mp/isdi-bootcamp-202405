console.log('TEST forEach');

console.log('CASE test 1');

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 };

object.forEach = function (callbackFn) {
    for (var i = 0; i < this.length; i++) {
        callbackFn(this[i], i, this);
    }
}

object.forEach((element, index, currentObject) => console.log(element, index, currentObject));

// a 0 {...}
// b 1 {...}
// c 2 {...}
// d 3 {...}
// e 4 {...}
// f 5 {...}

