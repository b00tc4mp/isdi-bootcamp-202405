console.log('TEST reverse')

console.log('CASE reverse the entire object !!IN PLACE!!')

var object1 = { 0: 'one', 1: 'two', 2: 'three', length: 3 };

console.log(object1);
//{ 0: 'one', 1: 'two', 2: 'three', length: 3 }

object1.reverse = function () {
    var aux;
    for (var i = 0; i < this.length - i; i++) {
        aux = this[i];
        this[i] = this[this.length - i - 1];
        this[this.length - i - 1] = aux;
    }
    return this;
}

var reversed = object1.reverse();
console.log(reversed);
//{ 0: undefined, 1: 'three', 2: 'two', 3: 'one', length: 3 }

console.log(object1);
//{ 0: undefined, 1: 'three', 2: 'two', 3: 'one', length: 3 }
