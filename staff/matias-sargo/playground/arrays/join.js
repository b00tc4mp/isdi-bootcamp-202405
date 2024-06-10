console.log('CASE join elements from array')

var fruits = ['apple', 'orange', 'banana', 'pinapple', 'watermelon'] // new Array...

console.log(fruits)
// ['apple', 'orange', 'banana', 'pinapple', 'watermelon']

var joined = fruits.join()

console.log(joined)
// apple,orange,banana,pinapple,watermelon

console.log('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')

console.log(joined)
// true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }

var joined = things.join()

console.log(joined)
// true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join(undefined)

console.log(joined)
// true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join('')

console.log(joined)
// truehello world100[object Object]10,20,30function () { }