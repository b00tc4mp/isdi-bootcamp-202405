console.log("TEST lastIndexOf");
console.log("CASE lastIndexOf");
const beasts = { 0: "Dodo", 1: "Tiger", 2: "Lion", 3: "Dodo", length: 4 };

console.log(beasts);

beasts.lastIndexOf = function (element) {
  for (i = this.length; i > -1; i--) {
    if (this[i] === element) {
      var index = i;

      return index;
    }
  }
  return -1;
};

beasts.lastIndexOf();
var animalslIndex = beasts.lastIndexOf("Lion");
console.log(animalslIndex);

beasts.lastIndexOf = function (element, fromIndex) {
  if (fromIndex === undefined) fromIndex = this.length;

  for (var i = fromIndex; i > -1; i--) {
    if (this[i] === element) {
      var index = i;

      return index;
    }
  }
  return -1;
};

var animalIndex = beasts.lastIndexOf("Tiger", 2);

console.log(animalIndex);

beasts.lastIndexOf = function (element, fromIndex) {
  if (fromIndex === undefined) fromIndex = this.length;
  else if (fromIndex < 0) fromIndex = this.length + fromIndex;

  for (var i = fromIndex; i > -1; i--) {
    if (this[i] === element) {
      var index = i;

      return index;
    }
  }
  return -1;
};

var animalIndex = beasts.lastIndexOf("Lion", -2);

console.log(animalIndex);
