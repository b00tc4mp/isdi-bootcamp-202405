console.info('TEST map')

console.info('CASE map from objects')

var numbers = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };

numbers.map = function (callbackfunction) {

    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {


        newObject[newObject.length++] = callbackfunction(this[i], i, this)
    }

    return newObject

}

var map1 = numbers.map((x) => x * 2);

console.info(map1);
//  {0: 2, 1: 8, 2: 18, 3: 32, length: 4}