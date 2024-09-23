console.log('TEST indexOf')

console.log('CASE first index of element in object');

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 };

beasts.indexOf = function (searchElement, fromIndex = 0) {
    /*if (fromIndex >= this.length) {
        return -1
    } else if (fromIndex < 0 && fromIndex >= -this.length) {
        for (var i = (this.length + fromIndex); i < this.length; i++) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    } else {
        for (var i = fromIndex; i < this.length; i++) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    }*/
    if (fromIndex >= this.length) {
        return -1;
    } else if (fromIndex >= -this.length && fromIndex < 0) {
        fromIndex = fromIndex + this.length;
    } else if (fromIndex < -this.length) {
        fromIndex = 0;
    }

    for (var i = fromIndex; i < this.length; i++) {
        if (searchElement === this[i]) {
            return i;
        }
    }
    return -1;
}

console.log(beasts.indexOf('bison'));
//1

console.log(beasts.indexOf('bison', 2));
//4

console.log(beasts.indexOf('giraffe'));
//-1