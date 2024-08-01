console.info('TEST join')

console.info('CASE join elements from objects')

var trees = { 0: 'palm', 1: 'cedar', 2: 'oak', length: 3 }

trees.join = function (separator) {

    var result = '';

    if (separator === undefined) {

        separator = ','
    }

    for (var index = 0; index < this.length; index++) {

        result += this[index]

        if (index < this.length - 1) {

            result += separator

        }
    }

    return result;
}

console.info(trees.join('-'))
// 'palm-cedar-oak'
console.info(trees.join())
//'palm,cedar,oak
console.info(trees.join(''))
//'palmcedaroak'
