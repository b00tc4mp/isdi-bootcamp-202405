console.info('TEST keys in array')


var letters = ['a', 'b', 'c'];

const iterator = array1.keys();

for (const key of iterator) {
    console.log(key);
}

console.assert(letters1[0] === 0, 'letters1[0] is 0')
console.assert(letters1[1] === 1, 'letters1[1] is 1')
console.assert(letters1[2] === 2, 'letters1[2] is 2')
