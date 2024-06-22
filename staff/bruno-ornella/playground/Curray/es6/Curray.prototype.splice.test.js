const Curray = require('./Curray')


console.info('TEST splice')

console.info('CASE insert feb in month')

{
    const month = new Curray('Jan', 'Mar', 'Apr', 'Jun')




    const res = month.splice(1, 0, 'Feb')

    console.assert(month instanceof Curray, 'res is an Curray')
    console.assert(res.length === 0, 'res length is 0')

    console.assert(month.length === 5, 'month length is 5')
    console.assert(month[0] === 'Jan', 'month at 0 is Jan')
    console.assert(month[1] === 'Feb', 'month at 1 is Feb')
    console.assert(month[2] === 'Mar', 'month at 2 is Mar')
    console.assert(month[3] === 'Apr', 'month at 3 is Apr')
    console.assert(month[4] === 'Jun', 'month at 4 is Jun')
}

console.info('CASE raplace aprr with in months')
{
    const month = new Curray('Jan', 'Feb', 'Mar', 'Aprr', 'Jun')

    const res = month.splice(3, 1, 'Apr')

    console.assert(month instanceof Curray, 'Month is an Curray')
    console.assert(res.length === 1, 'res length is 1')
    console.assert(res[0] === 'Aprr', 'res at 0 is Aprr')

    console.assert(month.length === 5, 'month length is 5')
    console.assert(month[0] === 'Jan', 'month at 0 is Jan')
    console.assert(month[1] === 'Feb', 'month at 1 is Feb')
    console.assert(month[2] === 'Mar', 'month at 2 is Mar')
    console.assert(month[3] === 'Apr', 'month at 3 is Apr')
    console.assert(month[4] === 'Jun', 'month at 3 is Jun')
}
console.info('CASE replace blue and red by violet')
{
    const colors = new Curray('yellow', 'green', 'red', 'blue', 'pink', 'skyblue', 'plum', 'brown', 'gray', 'black', 'white') // ['...', ...]

    const removed = colors.splice(2, 2, 'violet')

    console.assert(colors.length === 10, 'colors length is 10')
    console.assert(colors[0] === 'yellow', 'colors at 0 is yellow')
    console.assert(colors[1] === 'green', 'colors at 1 is green')
    console.assert(colors[2] === 'violet', 'colors at 2 is violet')
    console.assert(colors[3] === 'pink', 'colors at 3 is pink')
    console.assert(colors[4] === 'skyblue', 'colors at 4 is skyblue')
    console.assert(colors[5] === 'plum', 'colors at 5 is plum')
    console.assert(colors[6] === 'brown', 'colors at 6 is brown')
    console.assert(colors[7] === 'gray', 'colors at 7 is gray')
    console.assert(colors[8] === 'black', 'colors at 8 is black')
    console.assert(colors[9] === 'white', 'colors at 9 is white')

    console.assert(removed instanceof Curray, 'removed is an Curray')
    console.assert(removed.length === 2, 'removed length is 2')
    console.assert(removed[0] === 'red', 'removed at 0 is red')
    console.assert(removed[1] === 'blue', 'removed at 1 is blue')
}
