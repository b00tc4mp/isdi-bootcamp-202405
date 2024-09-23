console.info('TEST reduce')
console.info('CASE reduce elements to Array')


var numbers = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
var initialValue = 0;
var sumWithInitial = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
);

console.assert(sumWithInitial === 10, 'sumWithInitial is equal to 10')