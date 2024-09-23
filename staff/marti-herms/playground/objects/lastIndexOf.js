console.log('TEST lastIndexOf')

console.log('CASE last index of element in object');

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 };

animals.lastIndexOf = function (searchElement, fromIndex = this.length - 1) {
    /*if (fromIndex < -this.length) {
        return -1
    } else if (fromIndex < 0 && fromIndex >= -this.length) {
        for (var i = (this.length + fromIndex); i > -1; i--) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    } else {
        for (var i = this.length - 1; i > -1; i--) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    }*/
    if (fromIndex < -this.length) {
        return -1;
    } else if (fromIndex < 0 && fromIndex >= -this.length) {
        fromIndex = this.length + fromIndex;
    } else if (fromIndex >= this.length) {
        fromIndex = this.length - 1;
    }

    for (var i = fromIndex; i > -1; i--) {
        if (searchElement === this[i]) {
            return i;
        }
    }
    return -1;
}

console.log(animals.lastIndexOf('Dodo'));
//3

console.log(animals.lastIndexOf('Tiger'));
//1