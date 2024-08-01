var Curray = require('./Curray')

console.info('TEST every')

console.info('CASE every items are small in Curray')
{
    const numbers = new Curray(1, 30, 39, 29, 10, 13);

    const isBelowThreshold = function (currentValue) {

        return currentValue < 40;

    }

    var everyIsBelowThreshold = numbers.every(isBelowThreshold)

    console.assert(everyIsBelowThreshold === true, 'all numbers in this array are less than 40')
    console.assert(numbers.length === 6, 'numbers length is 6')
}
console.info('CASE every items are not big in Curray')
{
    const numbers = new Curray(1, 30, 39, 29, 10, 13);

    const isAboveThreshold = function (currentValue) {

        return currentValue > 40;

    }


    const everyIsAboveThreshold = numbers.every(isAboveThreshold)

    console.assert(everyIsAboveThreshold === false, 'all numbers in this array are not greater than 40')
    console.assert(numbers.length === 6, 'numbers length is 6')
}