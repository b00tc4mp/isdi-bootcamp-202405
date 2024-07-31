console.log('TEST lastindesOf ')


console.log("CASE lasIndexOF from object")

pets = { 0: 'dog', 1: 'cat', 2: 'bird', 3: 'turtle', 4: 'snake', 5: 'bird', length: 6 }

pets.lastIndexOf = function (element, fromIndex) {

    /*var elem =this[4]
     if (elem === element)
         return 4
     var elem =this[3]
     if (elem === element)
         return 3
     var elem =this[2]
     if (elem === element)
         return 2
     var elem =this[1]
     if (elem === element)
         return 1
     var elem =this[0]
     if (elem === element)
         return 0
    
     
     return -1
     */

    /* var elem =this[3]
     if (elem === element) //bird === trutle
     var elem =this[2]
     if (elem === element) bird === bird
         return 2
        */

    if (fromIndex === undefined)
        fromIndex = this.length - 1
    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i > -1; i--) {
        var elem = this[i]
        if (element === elem)
            return i
    }
    return -1
}


var lastIndex = pets.lastIndexOf('bird')
console.log(lastIndex)
//5

var lastIndex = pets.lastIndexOf('elephant')
console.log(lastIndex)
//-1

var lastIndex = pets.lastIndexOf('bird', 3)
console.log(lastIndex)
//2

var lastIndex = pets.lastIndexOf('bird', -3)
console.log(lastIndex)
//2