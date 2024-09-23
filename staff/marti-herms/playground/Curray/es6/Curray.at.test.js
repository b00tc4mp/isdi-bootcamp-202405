const Curray = require('./Curray');
require('./Curray.prototype.at');

console.log('TEST Curray.prototye.at');

console.log('CASE element a positive index');

{
    const nums = new Curray(5, 12, 8, 130, 44);

    const num = nums.at(3);

    console.assert(num === 130, 'num is 130');
}

console.log('CASE element at index 0');
{
    const nums = new Curray(5, 12, 8, 130, 44);

    const num = nums.at(0);

    console.assert(num === 5, 'num is 5');
}
console.log('CASE element a negative index');
{
    const nums = new Curray(5, 12, 8, 130, 44);

    const num = nums.at(-3);

    console.assert(num === 8, 'num i 8');
}
console.log('CASE element a positive index greater than length');
{
    const nums = new Curray(5, 12, 8, 130, 44);

    const num = nums.at(100);

    console.assert(num === undefined, 'num is undefined');
}
console.log('CASE element a negative index greater than -length');
{
    const nums = new Curray(5, 12, 8, 130, 44);

    const num = nums.at(-100);

    console.assert(num === undefined, 'num is undefined');
}