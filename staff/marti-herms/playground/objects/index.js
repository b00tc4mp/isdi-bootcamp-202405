console.log('TEST objects');

console.log('CASE add elements to object');

var o = new Object;

o[0] = 10;
o[1] = 20;
o[2] = 30;
o.length = 3;

console.log(o);
//{ 0: 10, 1: 20, 2: 30, length: 3 }



console.log('CASE remove last element from object');

var o = new Object;

o[0] = 10;
o[1] = 20;
o[2] = 30;
o.length = 3;

console.log(o);
//{ 0: 10, 1: 20, 2; 30, length: 3 }

delete o[2];
//o.length = o.length -1;
//o.length -= 1;
o.length--;

console.log(o);
//{ 0: 10, 1:20, length: 2 }



console.log('CASE remove last 2 elements from object');

var colors = new Object;

colors[0] = 'red';
colors[1] = 'green';
colors[2] = 'blue';
colors[3] = 'yellow';
colors.length = 4;

console.log(colors);
//{ 0: red, 1: green, 2: blue, 3: yellow, length: 4}

delete colors[3];
delete colors[2];

//colors.length = colors.length - 2;
colors.length -= 2;

console.log(colors);
//{ 0: red, 1: green, length: 2}



console.log('CASE push and pop an element to object');

var cars = new Object;

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 };
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 };
cars[2] = { brand: 'fiat', model: '500', year: 2017 };
cars.length = 3;

console.log(cars);
//{ 0: {...}, 1: {...}, 2: {...}, length: 3}

cars.push = function (element) {
    this[this.length] = element;
    this.length++;
    return this.length;
}

cars.pop = function () {
    this.length--;
    var i = this[this.length];
    delete this[this.length];
    return i;
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 });

console.log(cars);
//{{...},{...},{...},{...}}
console.log(cars.pop());
console.log(cars);



console.log('CASE push multiple elements to objects');

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 };

console.log(animals);
//{ 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows' }
console.log(animals.length);
//4

animals.push = function (...element) {
    for (var i = 0; i < element.length; i++) {
        this[this.length] = element[i];
        this.length++;;
    }
    return this.length;
}

var count = animals.push('chickens', 'cats', 'dogs');

console.log(animals);
//{ 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chickens', 5: 'cats', 6: 'dogs' }
console.log(animals.length);
//7



console.log('CASE return value of property in object');

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };

console.log(nums);
//{ 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

var index = 3;

nums.at = function (index) {
    if (index < 0) {
        return nums[this.length + index];
    }
    return nums[index];
}

console.log(nums.at(index));
//130

index = -2;

console.log(nums.at(index));
//130



console.log('CASE concat two objects');

var char1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var char2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 };

console.log(char1);
//{ 0: 'a', 1: 'b', 2: 'c', length:3}
console.log(char2);
//{ 0: 'd', 1: 'f', 2: 'g', length:3}

char1.concat = function (element) {
    var newObject = { length: 0 };

    for (var i = 0; i < this.length; i++) {
        var elem = this[i];

        newObject[newObject.length++] = elem;
    }

    for (var i = 0; i < element.length; i++) {
        var elem = element[i];

        newObject[newObject.length++] = elem;
    }

    return newObject;
}

var char3 = char1.concat(char2);

console.log(char3);
//{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'f', 5: 'g', length: 6}



console.log('CASE concat elements from 5 objects')

var nums1 = { 0: 10, 1: 20, 2: 30, length: 3 }
var nums2 = { 0: 400, 1: 500, length: 2 }
var nums3 = { 0: -60, 1: -70, length: 2 }
var nums4 = { 0: 800, 1: 900, length: 2 }
var nums5 = { 0: -1000, length: 1 }

nums1.concat = function (...elements) {
    var newObject = { length: 0 };

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        newObject[newObject.length++] = elem
    }
    for (var i = 0; i < elements.length; i++) {
        for (var j = 0; j < elements[i].length; j++) {
            var elem = elements[i][j]
            newObject[j + newObject.length++] = elem;
        }
    }
    return newObject;
}

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.log(nums1)
//{ 0: 10, 1: 20, 2: 30, length: 3 }
console.log(nums2)
//{ 0: 400, 1: 500, length: 2 }
console.log(nums3)
//{ 0: -60, 1: -70, length: 2 }
console.log(nums4)
//{ 0: 800, 1: 900, length: 2 }
console.log(nums5)
//{ 0: -1000, length: 1 }

console.log(nums6)
//{ 0: 10, 1: 20, 2: 30, 3: 400, 4: 500, 5: -60, 6: -70, 7: 800, 8: 900, 9: -1000, length: 10 }



console.log('CASE join elements in object');

var elements = { 0: 'Fire', 1: 'Earth', 2: 'Water', length: 3 };

console.log(elements);
//{ 0: 'Fire', 1: 'Earth', 2: 'Water', length: 3 }

elements.join = function (separator = null) {
    var finalString = '';
    if (separator === null) {
        for (var i = 0; i < this.length; i++) {
            if (i === this.length - 1) {
                finalString += (this[i]);
            } else {
                finalString += (this[i] + ',');
            }
        }
        return finalString
    } else {
        for (var i = 0; i < this.length; i++) {
            if (i === this.length - 1) {
                finalString += (this[i]);
            } else {
                finalString += (this[i] + separator);
            }
        }
        return finalString;
    }
}

var str1 = elements.join();
var str2 = elements.join('');
var str3 = elements.join('-');

console.log(str1);
//'Fire,Earth,Water'
console.log(str2);
//'FireEarthWater'
console.log(str3);
//'Fire-Earth-Water'



console.log('CASE check element in object');

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };

pets.includes = function (searchElement, fromIndex = 0) {
    if (fromIndex > this.length) {
        return false;
    } else if (fromIndex < 0 && fromIndex > -this.length) {
        for (var i = this.length + fromIndex; i < this.length; i++) {
            if (searchElement === this[i]) {
                return true;
            }
        }
        return false;
    } else {
        for (var i = 0; i < this.length; i++) {
            if (searchElement === this[i + fromIndex]) {
                return true;
            }
        }
        return false;
    }
}

console.log(pets.includes('cat'));
//true

console.log(pets.includes('at'));
//false



console.log('CASE first index of element in object');

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 };

beasts.indexOf = function (searchElement, fromIndex = 0) {
    if (fromIndex >= this.length) {
        return -1
    } else if (fromIndex < 0 && fromIndex >= -this.length) {
        for (var i = (this.length + fromIndex); i < this.length; i++) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    } else {
        for (var i = fromIndex; i < this.length; i++) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    }
}

console.log(beasts.indexOf('bison'));
//1

console.log(beasts.indexOf('bison', 2));
//4

console.log(beasts.indexOf('giraffe'));
//-1



console.log('CASE last index of element in object');

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 };

animals.lastIndexOf = function (searchElement, fromIndex = 0) {
    if (fromIndex < -this.length) {
        return -1
    } else if (fromIndex < 0 && fromIndex >= -this.length) {
        for (var i = (this.length + fromIndex); i > -1; i--) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    } else {
        for (var i = this.length - 1; i > -1; i--) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    }
}

console.log(animals.lastIndexOf('Dodo'));
//3

console.log(animals.lastIndexOf('Tiger'));
//1



console.log('CASE copy fragment of object');

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 };

console.log(animals);
//{ 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }

animals.slice = function (start = 0, end = this.length) {
    var newObject = { length: 0 };
    if (start < -this.length) {
        start = 0;
    } else if (start >= -this.length && start < 0) {
        start = start + this.length;
    }

    if (end < -this.length) {
        end = 0;
    } else if (end > this.length) {
        end = this.length;
    } else if (end >= -this.length && end < 0) {
        end = end + this.length;
    }

    if (end <= start || start >= this.length) {
        return newObject;
    }

    for (var i = 0; i < end - start; i++) {
        newObject[i] = this[start + i];
        newObject.length++;
    }
    return newObject;
}

console.log(animals.slice(2));
//{ 0: 'camel', 1: 'duck', 2, 'elephant', length: 3 }

console.log(animals.slice(2, 4));
//{ 0: 'camel', 1: 'duck', length: 2 }

console.log(animals.slice(1, 5));
//{ 0: 'bison', 1: 'camel', 2: 'duck', 3: 'elephant', length: 4 }

console.log(animals.slice(-2));
//{ 0: 'duck', 1: 'elephant', length: 2 }

console.log(animals.slice(2, -1));
//{ 0: 'camel', 1: 'duck', length: 2 }

console.log(animals.slice());
//{ 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }


console.log('CASE reverse the entire object !!IN PLACE!!')

var object1 = { 0: 'one', 1: 'two', 2: 'three', length: 3 };

console.log(object1);
//{ 0: 'one', 1: 'two', 2: 'three', length: 3 }

object1.reverse = function () {
    var aux;
    for (var i = 0; i < this.length - i; i++) {
        aux = this[i];
        this[i] = this[this.length - i];
        this[this.length - i] = aux;
    }
    return this;
}

var reversed = object1.reverse();
console.log(reversed);
//{ 0: undefined, 1: 'three', 2: 'two', 3: 'one', length: 3 }

console.log(object1);
//{ 0: undefined, 1: 'three', 2: 'two', 3: 'one', length: 3 }



console.log('CASE remove first element of object');

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 };

console.log(object1);
//{ 0: 1, 1: 2, 2: 3, length: 3 }

object1.shift = function () {
    if (this.length === 0) {
        return undefined;
    } else {
        var removedElement = this[0];
        this.length--;
        for (var i = 0; i < this.length; i++) {
            this[i] = this[i + 1];
        }
        delete this[this.length];
        return removedElement;
    }
}

var firstElement = object1.shift();

console.log(object1);
//{ 0: 2, 1: 3, length: 2 }

console.log(firstElement);
//1



console.log('CASE copy fragment of object inside of the object');

var object1 = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 };

console.log(object1);
//{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

object1.copyWithin = function (target, start, end = this.length) {
    if (target >= -this.length && target < 0) {
        target = target + this.length;
    } else if (target < -this.length) {
        target = 0;
    }

    if (start >= -this.length && start < 0) {
        start = start + this.length;
    } else if (start < -this.length) {
        start = 0;
    }

    if (end >= -this.length && end < 0) {
        end = end + this.length;
    } else if (end < -this.length) {
        end = 0;
    } else if (end > this.length) {
        end = this.length;
    }

    if (end <= start || start >= this.length || target >= this.length) {
        return this;
    }
    var auxArray = [];
    for (var i = 0; i < end - start; i++) {
        auxArray[i] = this[start + i];
    }
    for (var i = 0; i < auxArray.length; i++) {
        this[target + i] = auxArray[i];
    }
    return this;
}

console.log(object1.copyWithin(0, 3, 4));
//{ 0: 'd', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log(object1.copyWithin(1, 3));
//{ 0: 'd', 1: 'd', 2: 'e', 3: 'd', 4: 'e', length: 5 }
