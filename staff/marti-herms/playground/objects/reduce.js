console.log('TEST reduce');

var object = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };

object.reduce = function (callbackFn, initialValue = undefined) {
    if (initialValue === undefined) {
        var aux;
        for (var i = 0; i < this.length; i++) {
            if (i === 0) {
                aux = callbackFn(this[i], this[++i]);
            } else {
                aux = callbackFn(aux, this[i])
            }
        }
        return aux;
    }
    var aux;
    for (var i = 0; i < this.length; i++) {
        if (i === 0) {
            aux = callbackFn(initialValue, this[i]);
        } else {
            aux = callbackFn(aux, this[i])
        }
    }
    return aux;
}


var initialValue = 0;
var sumWithInitial = object.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
);

console.log(sumWithInitial);
//10