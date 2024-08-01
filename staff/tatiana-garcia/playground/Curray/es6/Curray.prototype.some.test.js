var Curray = require("./Curray");

console.info('TEST some')

console.info('CASE method.some()')

const nums = new Curray(1, 2, 3, 4, 5);

const numsEven = nums.some(function (num) {

    return num > 10
});

console.assert(numsEven === false, 'no one number is greater than 10')

console.info('CASE method.some()')
{
    const numsEven = nums.some(function (num) {

        return num < 10
    });

    console.assert(numsEven === true, 'almost one number is greatest')
}