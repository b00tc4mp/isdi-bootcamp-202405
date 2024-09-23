console.log('TEST copyWithin')

console.log('CASE copy fragment of object inside of the object');

var object1 = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 };

console.log(object1);
//{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

object1.copyWithin = function (target, start, end = this.length) {
    if (target >= -this.length && target < 0) {
        target = target + this.length;
    } else if (target < -this.length) {
        target = 0;
    }

    if (start >= -this.length && start < 0) {
        start = start + this.length;
    } else if (start < -this.length) {
        start = 0;
    }

    if (end >= -this.length && end < 0) {
        end = end + this.length;
    } else if (end < -this.length) {
        end = 0;
    } else if (end > this.length) {
        end = this.length;
    }

    if (end <= start || start >= this.length || target >= this.length) {
        return this;
    }
    var auxArray = [];
    for (var i = 0; i < end - start; i++) {
        auxArray[i] = this[start + i];
    }
    for (var i = 0; i < auxArray.length; i++) {
        this[target + i] = auxArray[i];
    }
    return this;
}

console.log(object1.copyWithin(0, 3, 4));
//{ 0: 'd', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log(object1.copyWithin(1, 3));
//{ 0: 'd', 1: 'd', 2: 'e', 3: 'd', 4: 'e', length: 5 }