console.info("TEST map");

console.info("CASE map for objects");

var numbers = [1, 4, 9, 16];

numbers.map = function (callbackFunction) {
  var newObject = { lengt: 0 };
  for (var i = 0; i < this.length; i++) {
    newObject[newObject.lengt++] = callbackFunction(this[i], i, this);
  }
  return newObject;
};

var map = numbers.map((x) => x * 2);

console.info(map);
