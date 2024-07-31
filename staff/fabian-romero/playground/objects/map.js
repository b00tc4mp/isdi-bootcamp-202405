console.log('TEST map in object')


console.log('CASE map')


var num1 = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };

num1.map = function (callbackFunction) {
    var newObject = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        newObject[newObject.length++] = callbackFunction(this[i])

        return newObject
    }
}

var num2 = num1.map((x) => x * 2);

console.log(num2);