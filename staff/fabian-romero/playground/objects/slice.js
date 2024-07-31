console.log('CASE slice Object')

var barcelona = { 0: 'sagrada', 1: 'montjuic', 2: 'wella', 3: 'beach', 4: 'agbar', length: 5 }

barcelona.slice = function (fromIndex, endIndex) {

    if (endIndex === undefined)
        endIndex = this.length

    else if (endIndex < 0)
        endIndex = this.length + endIndex

    if (fromIndex === undefined)
        fromIndex = this.length + fromIndex

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex


    var newObject = { length: 0 }
    for (var i = fromIndex; i < endIndex; i++) {
        newObject[newObject.length++] = this[i]

    }
    return newObject
}


console.log(barcelona.slice(2))
console.log(barcelona.slice(0))
console.log(barcelona.slice(-2, -1))

