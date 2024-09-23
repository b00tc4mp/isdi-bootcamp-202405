console.log('TEST slice')

console.log('CASE copy fragment of object');

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 };

console.log(animals);
//{ 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }

animals.slice = function (start = 0, end = this.length) {
    var newObject = { length: 0 };
    if (start < -this.length) {
        start = 0;
    } else if (start >= -this.length && start < 0) {
        start = start + this.length;
    }

    if (end < -this.length) {
        end = 0;
    } else if (end > this.length) {
        end = this.length;
    } else if (end >= -this.length && end < 0) {
        end = end + this.length;
    }

    if (end <= start || start >= this.length) {
        return newObject;
    }

    for (var i = 0; i < end - start; i++) {
        newObject[i] = this[start + i];
        newObject.length++;
    }
    return newObject;
}

console.log(animals.slice(2));
//{ 0: 'camel', 1: 'duck', 2, 'elephant', length: 3 }

console.log(animals.slice(2, 4));
//{ 0: 'camel', 1: 'duck', length: 2 }

console.log(animals.slice(1, 5));
//{ 0: 'bison', 1: 'camel', 2: 'duck', 3: 'elephant', length: 4 }

console.log(animals.slice(-2));
//{ 0: 'duck', 1: 'elephant', length: 2 }

console.log(animals.slice(2, -1));
//{ 0: 'camel', 1: 'duck', length: 2 }

console.log(animals.slice());
//{ 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }