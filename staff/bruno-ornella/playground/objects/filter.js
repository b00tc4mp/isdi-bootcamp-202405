console.log('TEST filter ind objets')

console.log('CASE filter')


var words = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 }

words.filter = function (callback) {
    var elem = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this))
            elem[elem.length++] = this[i]

    }
    return elem

}



var result = words.filter((word) => word.length > 6);

console.log(result);
//{ '0': 'exuberant', '1': 'destruction', '2': 'present', length: 3 }
