console.info("TEST concat");

console.info("CASE concat elements from two objects");

var chars1 = { 0: "a", 1: "b", 2: "c", length: 3 };
var chars2 = { 0: "d", 1: "e", 2: "f", length: 3 };

console.info(chars1);
// { 0: 'a', 1: 'b', 2: 'c', length: 3 }
console.info(chars2);
// { 0: 'd', 1: 'e', 2: 'f', length: 3 }

chars1.concat = function (object) {
  var newObject = { length: 0 };

  for (var i = 0; i < this.length; i++) {
    var elem = this[i];

    newObject[newObject.length++] = elem;
  }

  for (var i = 0; i < object.length; i++) {
    var elem = object[i];

    newObject[newObject.length++] = elem;
  }

  return newObject;
};

var chars3 = chars1.concat(chars2);

console.info(chars1);
// { 0: 'a', 1: 'b', 2: 'c', length: 3 }
console.info(chars2);
// { 0: 'd', 1: 'e', 2: 'f', length: 3 }
console.info(chars3);
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

console.info("CASE concat elements from 5 objects");

var nums1 = { 0: 10, 1: 20, 2: 30, length: 3 };
var nums2 = { 0: 400, 1: 500, length: 2 };
var nums3 = { 0: -60, 1: -70, length: 2 };
var nums4 = { 0: 800, 1: 900, length: 2 };
var nums5 = { 0: -1000, length: 1 };

nums1.concat = function () {
  // TODO implement me (USE this, arguments)
  var res = { length: 0 };

  for (var i = 0; i < this.length; i++) {
    var elem = this[i];

    res[res.length++] = elem;
  }

  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];

    for (var j = 0; j < argument.length; j++) {
      var elem = argument[j];

      res[res.length++] = elem;
    }
  }

  return res;
};

var nums6 = nums1.concat(nums2, nums3, nums4, nums5);

console.info(nums1);
// { 0: 10, 1: 20, 2: 30, length: 3 }
console.info(nums2);
// { 0: 400, 1: 500, length: 2 }
console.info(nums3);
// { 0: -60, 1: -70, length: 2 }
console.info(nums4);
// { 0: 800, 1: 900, length: 2 }
console.info(nums5);
// { 0: -1000, length: 1 }

console.info(nums6);
// { 0: 10, 1: 20, 2: 30, 3: 400, 4: 500, 5: -60, 6: -70, 7: 800, 8: 900, 9: -1000, length: 10 }
