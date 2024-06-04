console.log('TEST includes')

console.log('CASE objects includes nums')

var nums = { 0: 10, 1: 20, 2: 30, 3: 40, length: 4 }

nums.includes = function (numInclude) {
    //var elem = this[0]
    //if (elem === numInclude)
    //  return true

    // var elem = this[1]
    // if (elem === numInclude)
    // return true

    //var elem = this[2]
    //if (elem === numInclude)
    // return true

    //var elem = this[3]
    //if (elem === numInclude)
    //return true

    //return false
    //}

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        if (elem === numInclude)
            return true

    }
    return false
}

console.log(nums)
//{10, 20, 30, 40}

console.log(nums.includes(10))
//true

console.log(nums.includes(20))
//true

console.log(nums.includes(15))
//false



console.log('TEST array includes color from index')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'skyblue', 7: 'white', 8: 'black', 9: 'grey', length: 10 }

colors.includes = function (element, index) {
    if (index === undefined)
        index = 0

    else if (index < 0)
        index = this.length + index

    for (var i = index; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return true

    }
    return false
}


var included = colors.includes('pink', 2)
console.log(included)
//true

var included = colors.includes('red', 4)
console.log(included)
//true

var included = colors.includes('red', 8)
console.log(included)
//false

var included = colors.includes('orange')
console.log(included)
//true

var included = colors.includes('orange', undefined)
console.log(included)
//true

var included = colors.includes('black', -4)
console.log(included)
//true
