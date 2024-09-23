console.log('TEST reduce');

var array1 = [1, 2, 3, 4];

var initialValue = 0;
var sumWithInitial = array1.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
);

console.log(sumWithInitial);
//10