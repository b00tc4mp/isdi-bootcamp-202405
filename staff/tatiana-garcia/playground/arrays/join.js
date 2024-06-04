console.log('TEST join')
console.log('CASE join elements from arrays')

var trees = ['palm', 'cedar', 'oak']

var trees1 = trees.join()
console.log(trees1)
//'palm,cedar,oak'

console.log('CASE join elements with separator from arrays')

var trees = ['palm', 'cedar', 'oak']

var trees2 = trees.join("")
console.log(trees2)
//'palmcedaroak'

var trees3 = trees.join("-")
console.log(trees3)
//'palm-cedar-oak'