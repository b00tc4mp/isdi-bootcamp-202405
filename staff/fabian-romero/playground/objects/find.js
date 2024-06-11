console.log('TEST find in Arrays')


console.log('CASE find')



var numbers = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

numbers.find = function (callbackFunction) {
    for (var i = 0; i < this.length; i++) {
        if (callbackFunction(this[i], i, this)) return this[i]
    }
    return undefined;
}

var found = numbers.find((element) => element > 10);

console.log(found);

var found = numbers.find((element) => element > 100);

console.log(found);

var found = numbers.find((element) => element > 130);

console.log(found);