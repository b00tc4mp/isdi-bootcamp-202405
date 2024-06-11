console.log('TEST every in Arrays')

console.log('CASE every')
// si todos los elementos cumplen la condicion 

var isBelowThreshold = function (currentValue) {
    return currentValue > 3;
}

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
