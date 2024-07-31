console.log('TEST filter in Objects')


console.log('CASE filter')

//+

var words = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 }

words.filter = function (callbackFunction) {
    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        if (callbackFunction(this[i], i, this)) {
            newObject[newObject.length++] = this[i]
        }
    }

    return newObject
}


var result = words.filter((word) => word.length > 6);

console.log(result);

var result = words.filter((word) => word.length > 15);

console.log(result);