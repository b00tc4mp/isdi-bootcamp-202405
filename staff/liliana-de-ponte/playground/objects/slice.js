console.log('TEST slice')

console.log('CASE element at slice')

var animals2 = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 };

animals2.slice = function (fromIndex, endIndex) {
    if (endIndex === undefined)
        endIndex = this.length

    else if (endIndex < 0)
        endIndex = this.length + endIndex

    var newObj = { length: 0 }
    for (var i = fromIndex; i < endIndex; i++) {
        newObj[newObj.length++] = this[i]
    }
    return newObj
}

console.log(animals2.slice(2));
//["camel", "duck", "elephant"]

console.log(animals2.slice(2, 4));
//["camel", "duck"]

console.log(animals2.slice(1, 5));
//["bison", "camel", "duck", "elephant"]

console.log(animals2.slice(-2));
//["duck", "elephant"]

console.log(animals2.slice(2, -1));
//["camel", "duck"]

console.log(animals2.slice());
//["ant", "bison", "camel", "duck", "elephant"]