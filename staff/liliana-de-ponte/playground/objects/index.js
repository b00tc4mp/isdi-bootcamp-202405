console.log('TEST objects')

console.log('CASE add elements to object')

var o = new Object //{}

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
//{0: 10, 1: 20, 2: 30, length: 3}
console.log('CASE remove laste element from object')

var o = new Object

o[0] = 10
o[1] = 20
o[2] = 30
o.length = 3

console.log(o)
//{0: 10, 1:20, 2: 30, length: 3}

delete o[2]
//o.length= o.length - 1
//o.length -= 1
o.length--

console.log(o)
// {0: 10, 1:20 , length: 2}

console.log('CASE remove last 2 elements from object')

var colors = new Object

colors[0] = new Object

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[2] = 'yellow'

console.log(colors)
// {0: red, 1: green, 2: blue, 3:yellow, length: 4}

delete colors[3]
delete colors[2]
// colors.length = colors - length -2
colors.length -= 2

console.log(colors)
//{0: red, 1: green, length:2}

console.log('CASE push an element to object')
var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1900 }
cars[1] = { brand: 'lamborguini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
//{0: {...}, 1: {...}, 2:{...}, length: 3}
console.log(cars.length)
//3

cars.push = function (element) {
    //TODO add element into `this` objects (cars)
    this[this.length] = element
    //this.length++
    //return this.length
    return ++this.length;
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 });

console.log(cars)
//{0: {...}, 1:{...}. 2:{...}, length: 4}

console.log(cars.length)
//4

console.log('CASE push many elements to array')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }
animals.length = 4

console.log(animals)
//['pigs','goats','sheep','cows']

console.log(animals.length)
//4

//TODO implement animals.push

//animals.push = function (newAnimal1, newAnimal2, newAnimal3) {
//this[this.length++] = newAnimal1;
//this[this.length++] = newAnimal2;
//this[this.length++] = newAnimal3;
//return this.length
//}

animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]
        this[this.length++] = argument
    }
    return this.length
}

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
//[{pisg','goats','sheep', 'cows','chickens', 'cats', 'dogs'}

console.log(animals.length)
//7

console.log(count)
//7

console.log('CASE pop an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
//[{...}, {...}, {...}]
console.log(cars.length)
// 2

console.log(cars)
//[{...},{...}]

cars.pop = function () {
    var element = this[this.length - 1]

    //delete this[this.length - 1]
    //this.length--
    delete this[--this.length]

    return element
}

var last = cars.pop()

console.log(cars)
//[{...}.{...}]

console.log(cars.length)
//2

console.log(last)
//{ brand: 'fiat', model: '500', year: 2017 }

console.log('CASE element at index')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.log(nums)
// {5, 12, 8, 130, 44}
console.log(nums.lenght)
//5

nums.at = function (index) {
    //if (index >= 0)
    if (index >= -1)
        return this[index]
    else
        return this[this.length + index]
}

var num = nums.at(3)
console.log(num)
//130

var num = nums.at(0)
console.log(num)
//8

var num = nums.at(-3)
console.log(num)
//8

var num = nums.at(100)
console.log(num)
//undefined

var num = nums.at(100)
console.log(num)
//undefined

console.log('CASE concat elements from two objects')

var chars1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var chars2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 };

console.log(chars1)
//{ 0:'a', 1:'b',  2:'c', length: 3}

console.log(chars2)
//{ 0: 'd', 1:'e', 2:'f', length:3}

chars1.concat = function (object) {
    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        newObject[newObject.length++] = elem
    }
    for (var i = 0; i < object.length; i++) {
        var elem = object[i]

        newObject[newObject.length++] = elem
    }
    return newObject
}

var chars3 = chars1.concat(chars2)

console.log(chars1)
//{0: 'a', 1: 'b', 2: 'c', length: 3}
console.log(chars2)
//{0:'d', 1: 'e', 2: 'f', length: 3}
console.log(chars3)
// { 0:'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6}

console.log('CASE concat elements from 5 objects')

var nums1 = { 0: 10, 1: 20, 2: 30, length: 3 }
var nums2 = { 0: 400, 1: 500, length: 2 }
var nums3 = { 0: -60, 1: -70, length: 2 }
var nums4 = { 0: 800, 1: 900, length: 2 }
var nums5 = { 0: -1000, length: 1 }

nums1.concat = function () {
    //TODO implement me (USE this, arguments)
    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        newObject[newObject.length++] = elem
    }
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]
        for (var j = 0; j < argument.length; j++) {
            var elements = argument[j]
            newObject[newObject.length++] = elements
        }
    }
    return newObject
}

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.log(nums1)
// {0:10, 1:20, 2:30, length:3}
console.log(nums2)
//{0:400, 1:500, length:2}
console.log(nums3)
//{0: -60, 1:-70, length: 2}
console.log(nums4)
//{0:800, 1:900, length:2}
console.log(nums5)
//{0:-1000, length: 1}

console.log(nums6)
//{0:10, 1:20,2:30, 3:400, 4:500, 5:-60, 6:-70, 7:800, 8:900, 9:-1000 length: 10}

console.log('CASE element at indexOf')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }


animals.indexOf = function (animalName, fromIndex) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (animalName === element) {
            return i
        }
    }
    return -1
}

console.log(animals.indexOf('bison'))
//0

console.log(animals)
//{ '0': 'ant', '1': 'bison', '2': 'camel', '3': 'duck', '4': 'bison' }

console.log(animals.indexOf('bison'))
// 1

console.log(animals.indexOf('camel'))
//2

console.log(animals.indexOf('giraffe'))
//-1

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }


//el index negativo no funciona
animals.indexOf = function (animalName, indexStart) {
    if (indexStart === undefined)
        indexStart = 0

    else if (indexStart < 0)
        indexStart = this.length + indexStart

    for (var i = indexStart; i < animals.length; i++) {
        var element = this[i]
        if (animalName === element)
            return i
    }
    return -1
}

/*else if (indexStart < 0) {
        for (var i = indexStart + animals.length; i < animals.length - 1; i--) {
            if (animalName === animals[i]) {
                return i
            }
            return -1
        }
    }*/


console.log(animals.indexOf('bison', 3))
//4

console.log(animals.indexOf('bison', 1))
//1

console.log(animals.indexOf('duck', 1))
//3

console.log(animals.indexOf('bison', -3))
//1

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


console.log('CASE element at Reverse')

var nums = { 0: 'one', 1: 'two', 2: 'three', length: 3 };

console.log(nums)
//{0:'one', 1:'two',2: 'three', length: 3}

console.log(nums.length)
//3

//funciona pero no se detiene verlo por --inspect
nums.reverse = function () {
    var tmp;
    for (var i = 0; i < this.length - i; i++) {
        tmp = this[i]
        this[i] = this[this.length - i - 1];
        this[this.length - i - 1] = tmp;
    }
    return this
}

var numsReverse = nums.reverse()

console.log(numsReverse)
//{0: 'three', 1: 'two', 2: 'one'}

console.log(nums)
//[0: 'three',1: 'two',2: 'one']

console.log('CASE join elements from objects')

var obj = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 };

console.log(obj)
//{ 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 }

obj.join = function () {
    // var res = ''
    // var elem = this[0]
    // res += elem + ',' //Fire,
    // var elem= this[1]
    // res += elem + ',' //Fire,Air,
    // var elem = this[2] //Water
    // res+= elem //Fire,Air,Water
    //return res
    var res = ''
    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        res += elem
        if (i < this.length - 1)
            res += elem + ','
        //res += elem + (i < this.length - 1 ? ',' : '')

    }
    return res
}

var join = obj.join()

console.log(join);
//"Fire,Air,Water"

console.log('CASE join elements with separator $')

var things = { 0: true, 1: 'hello world', 2: 100, 3: { name: 'Oswald' }, 4: [10, 20, 30], 5: function () { }, length: 6 }

things.join = function (separator) {
    if (separator === undefined)
        separator = ','

    var res = ''

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        res += elem

        if (i < this.length - 1)
            res += separator

    }

    return res
}


var joined = things.join(' $ ')

console.log(joined)
//true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }

var joined = things.join()

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join(undefined)

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }


console.log('CASE element at lastIndexOf')

var zoo = { 0: 'Giraffe', 1: 'Tiger', 2: 'Giraffe', 3: 'Penguin', length: 4 };

console.log(zoo)
// {0: 'Giraffe',1: 'Tiger', 2:'Penguin',3: 'Giraffe'}

zoo.lastIndexOf = function (zooName, fromIndex) {
    if (fromIndex === undefined)
        fromIndex = this.length - 1

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i > -1; i--) {
        var elem = this[i]
        if (zooName === elem)
            return i
    }
    return -1
}


var lastIndexOf1 = zoo.lastIndexOf('Giraffe')

var lastIndexOf2 = zoo.lastIndexOf('Tiger')

var lastIndexOf3 = zoo.lastIndexOf('Elephant')

var lastIndexOf4 = zoo.lastIndexOf('Giraffe', 2);

var lastIndexOf5 = zoo.lastIndexOf('Giraffe', -2)

console.log(lastIndexOf1);
//2

console.log(lastIndexOf2);
//1

console.log(lastIndexOf3)
//-1

console.log(lastIndexOf4)
//0

console.log(lastIndexOf5)
//0




console.log('CASE element at shift')

var names1 = { 0: "Andrew", 1: "Tyrone", 2: "Paul", 3: "Maria", 4: "Gayatri", length: 5 };

console.log(names1)
//{0: "Andrew",1: "Tyrone",2: "Paul",3: "Maria",4: "Gayatri", length: 5}


names1.shift = function () {
    var deletedName = this[0]
    for (var index = 0; index < this.length - 1; index++) {
        this[index] = this[index + 1]
    }
    delete this[this.length - 1]
    this.length--;
    return deletedName
}

var newNames1 = names1.shift()

console.log(newNames1)
//["Andrew"]

console.log(names1)
//{0: "Tyrone",1: "Paul",2: "Maria",3: "Gayatri", length: 4}

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

console.log('CASE copyWithin')

var letters = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 };

letters.copyWithin = function (target, start, end) {
    if (end === undefined)
        end = this.length

    else if (end < 0)
        end = this.length + end


    if (start === undefined)
        start = 0

    else if (start < 0)
        start = this.length + start

    if (end <= start)
        return this

    if (target === undefined)
        target = 0

    else if (target < 0)
        target = this.length + target

    else if (target > start)
        return this

    var temporal = target;
    for (var i = start; i < end; i++) {
        this[temporal] = this[i]
        temporal++
    }
    return this
}



console.log(letters.copyWithin(0, 3, 4));
//{"d", "b", "c", "d", "e"}

console.log(letters.copyWithin(1, 3));
//{"d", "d", "e", "d", "e"} 