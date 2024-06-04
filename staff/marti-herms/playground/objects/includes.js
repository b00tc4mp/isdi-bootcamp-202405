console.log('TEST includes')

console.log('CASE check element in object');

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };

pets.includes = function (searchElement, fromIndex = 0) {
    /*if (fromIndex > this.length) {
        return false;
    } else if (fromIndex < 0 && fromIndex > -this.length) {
        for (var i = this.length + fromIndex; i < this.length; i++) {
            if (searchElement === this[i]) {
                return true;
            }
        }
        return false;
    } else {
        for (var i = 0; i < this.length; i++) {
            if (searchElement === this[i + fromIndex]) {
                return true;
            }
        }
        return false;
    }
    */
    if (fromIndex >= this.length) {
        return false;
    } else if (fromIndex >= -this.length && fromIndex < 0) {
        fromIndex = fromIndex + this.length;
    } else if (fromIndex < -this.length) {
        fromIndex = 0;
    }

    for (var i = fromIndex; i < this.length; i++) {
        if (searchElement === this[i]) {
            return true
        }
    }
    return false;
}

console.log(pets.includes('cat'));
//true

console.log(pets.includes('at'));
//false

console.log(pets.includes('cat', 1))
//false

console.log(pets.includes('bat', 1))
//true