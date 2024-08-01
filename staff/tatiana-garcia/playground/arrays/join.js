console.info('TEST join')
console.info('CASE join elements from Arrays')

var trees = ['palm', 'cedar', 'oak']

console.assert(trees[0] === 'palm', 'trees at 0 is palm')
console.assert(trees[1] === 'cedar', 'trees at 1 is cedar')
console.assert(trees[2] === 'oak', 'trees at 2 is oak')
console.assert(trees.length === 3, 'trees length is 3')

var trees1 = trees.join()
var treess = 'palm,cedar,oak'

console.assert(trees1 === treess, 'trees1 is equal to treess')
var trees2 = trees.join("")
var trees22 = 'palmcedaroak'

console.assert(trees2 === trees22, 'trees2 is equal to trees22')

var trees3 = trees.join("-")
var trees33 = 'palm-cedar-oak'
console.assert(trees3 === trees33, 'trees3 is equal to trees33')


console.info('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')
var joined1 = 'true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }'

console.assert(joined === joined1, 'joined is equal to joined1')