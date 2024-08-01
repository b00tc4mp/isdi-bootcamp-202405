console.info('TEST lastIndexOf')

console.info('CASE Method lastIndexOf()') // ME FALTA QUE COJA OTRO PARAMETRO

var cities = { 0: 'madrid', 1: 'barcelona', 2: 'leon', 3: 'madrid', length: 4 }

cities.lastIndexOf = function (item, fromIndex) {

    if (fromIndex === undefined) {

        fromIndex = this.length - 1

    } else if (fromIndex < 0) {

        fromIndex = this.length + fromIndex

    }

    for (var index = fromIndex; index > -1; index--) {

        if (item === this[index]) {

            return index
        }
    }
    return -1
}

console.info(cities.lastIndexOf('leon'))
//2
console.info(cities.lastIndexOf('pamplona'))
// -1
console.info(cities.lastIndexOf('madrid'))
//3
console.info(cities.lastIndexOf('madrid', 3))
// 3
console.info(cities.lastIndexOf('barcelona', -3))
//1
