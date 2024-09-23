console.log('TEST concat')

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
            newObject[newObject.length++] = elem;
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