console.log('TEST remove')

console.log('CASE remove first element of object');

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 };

console.log(object1);
//{ 0: 1, 1: 2, 2: 3, length: 3 }

object1.shift = function () {
    if (this.length === 0) {
        return undefined;
    } else {
        var removedElement = this[0];
        this.length--;
        for (var i = 0; i < this.length; i++) {
            this[i] = this[i + 1];
        }
        delete this[this.length];
        return removedElement;
    }
}

var firstElement = object1.shift();

console.log(object1);
//{ 0: 2, 1: 3, length: 2 }

console.log(firstElement);
//1