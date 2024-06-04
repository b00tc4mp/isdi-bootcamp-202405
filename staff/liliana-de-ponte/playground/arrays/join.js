console.log('CASE join elements from array')

var elements = ['Fire', 'Air', 'Water'];

console.log(elements)
//['Fire', 'Air', 'Water']

console.log(elements.join());
//"Fire,Air,Water"

console.log(elements.join(''));
//"FireAirWater"

console.log(elements.join('-'));
//"Fire-Air-Water"

console.log('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')

console.log(joined)
//true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }

var joined = things.join()

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join(undefined)

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }

