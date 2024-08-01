const Curray = require('./Curray')

console.info('TEST Curray.prototype.at')

console.info('CASE element positive index')

{
    const nums = new Curray(5, 12, 8, 130, 44)

    const num = nums.at(3)

    console.assert(num === 130, 'num is 130')
}

console.info('CASE element at index 0')

{
    const nums = new Curray(5, 12, 8, 130, 44)

    const num = nums.at(0)

    console.assert(num === 5, 'num is 5')
}

console.info('CASE element a negative index')

{
    const nums = new Curray(5, 12, 8, 130, 44)

    const num = nums.at(-3)

    console.assert(num === 8, 'num is 8')
}

console.info('CASE element a positive index greater than length')

{
    const nums = new Curray(5, 12, 8, 130, 44)

    const num = nums.at(100)

    console.assert(num === undefined, 'num is undefined')
}

console.info('CASE element a negative index greater than -length')

{
    const nums = new Curray(5, 12, 8, 130, 44)

    const num = nums.at(-100)

    console.assert(num === undefined, 'num is undefined')
}