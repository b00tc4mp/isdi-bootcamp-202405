console.log("TEST objects");

console.log("CASE add elements to object");

var o = new Object();

o[0] = 10;
o[1] = 20;
o[2] = 30;
o.length = 3;
console.log(o);

console.log("CASE remove last element form object");

var o = new Object();

o[0] = 10;
o[1] = 20;
o[3] = 30;
o.length = 3;

console.log(o);
delete o[2];
//o.length = o.length - 1;
//o.length -= 1;
o.length--;

console.log(o);

console.log("CASE remove last 2 elements from object");

var colors = new Object();

colors[0] = "red";
colors[1] = "green";
colors[2] = "blue";
colors[3] = "yellow";
colors.length = 4;

console.log(colors);

delete colors[3];
delete colors[2];
colors.length = colors.length - 2;

console.log(colors);

console.log("CASE push an element to objects");

var cars = new Object();

cars[0] = { brand: "ferrari", model: "gta", year: 1990 };
cars[1] = { brand: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { brand: "fiat", model: "500", year: 2017 };
cars.length = 3;

console.log(cars);
console.log(cars.length);

//cars.push({ brand: "ford", model: "fiesta", year: 2005 });

console.log(cars);

console.log(cars.length);

cars.push = function (element) {
  this[this.length] = element;
  this.length++;
  return this.length;
};

cars.push({ brand: "ford", model: "fiesta", year: 2005 });

console.log(cars);
console.log(cars.length);

console.log("CASE remove last element from object with .pop()");

var cars = new Object();
cars[0] = { branch: "ferrari", model: "gta", year: 1990 };
cars[1] = { branch: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { branch: "fiat", model: "500", year: 2017 };
cars[3] = { branch: "ford", model: "fiesta", year: 2005 };
cars.length = 4;

console.log(cars);
console.log(cars.length);

cars.pop = function () {
  if (this.length > 0) {
    var element = this[this.length - 1];
    delete this[--this.length];

    return element;
  }
  return undefined;
};
console.log(cars.pop());

console.log(cars);
console.log(cars.length);

console.log("CASE multiple push to an object");

var animals = { 1: "cat", 2: "dog", 3: "cow", length: 4 };

console.log(animals);

console.log(animals.length);

animals.push = function () {
  for (i = 0; i < arguments.length; i++) {
    var argument = arguments[i];
    this[this.length++] = argument;
  }
};
animals.push("chicken", "rabbit", "pig");

console.log(animals);
console.log(animals.length);

console.log("CASE element at index");

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };
console.log(nums);
console.log(nums.length);

nums.at = function (index) {
  if (index >= 0) {
    return this[index];
  } else {
    return this[this.length + index];
  }
};
console.log(num);

var num = nums.at(-3);

console.log(num);

console.log("CASE concat elements from two objects");

var chars1 = { 0: "a", 1: "b", 2: "c", length: 3 };
var chars2 = { 0: "d", 1: "e", 2: "f", length: 3 };
// console.log(chars1);
// console.log(chars2);

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
console.log(chars1);
console.log(chars2);
console.log(chars3);

console.log("CASE concat elements from 5 objects");

var num1 = { 0: 10, 1: 20, 2: 30, length: 3 };
var num2 = { 0: 400, 1: 500, length: 2 };
var num3 = { 0: -60, 1: -70, length: 2 };
var num4 = { 0: 800, 1: 900, length: 2 };
var num5 = { 0: -1000, length: 1 };

num1.concat = function () {
  var newChar = { length: 0 };

  for (var i = 0; i < this.length; i++) {
    var elem = this[i];
    newChar[newChar.length++] = elem;
  }

  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      var argument = arguments[i][j];
      newChar[newChar.length++] = argument;
    }
  }
  return newChar;
};

var num6 = num1.concat(num2, num3, num4, num5);

console.log(num1);
console.log(num2);
console.log(num3);
console.log(num4);
console.log(num5);
console.log(num6);
//TODO implement case for join
console.log("CASE join elements in a string");

const elements = { 0: "Fire", 1: "Air", 2: "Water", length: 3 };

elements.join = function () {
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      //esto es para que al llegar al último elemento no ponga ',' pero en el resto sí
      count += ",";
    }
  }
  return joined;
};

var joinedElements = elements.join();

console.log(joinedElements);

console.log("CASE join elements with separator");

var things = {
  0: true,
  1: "hello world",
  2: 100,
  3: { name: "Oswald" },
  4: [10, 20, 30],
  5: function () {},
  length: 6,
};

things.join = function (separator) {
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      //esto es para que al llegar al último elemento no ponga ' $ ' pero en el resto sí
      count += separator;
    }
  }
  return joined;
};
var joined = things.join(" $ ");

console.log(joined);

console.log("CASE join elements without separator");

var things = {
  0: true,
  1: "hello world",
  2: 100,
  3: { name: "Oswald" },
  4: [10, 20, 30],
  5: function () {},
  length: 6,
};

things.join = function (separator) {
  if (separator === undefined) {
    separator = ","; //esto es para que si no hay separador devuelva el join con  ','
  }
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      count += separator;
    }
  }
  return joined;
};
var joined = things.join();

console.log(joined);

var joined = things.join(undefined);

console.log(joined);

var joined = things.join("");

console.log(joined);

//TODO implement case for includes

console.log("CASE if an object has an element");

var ramones = { 0: "Yoey", 1: "Deedee", 2: "Johnny", 3: "Marky", length: 4 };

ramones.includes = function (element) {
  for (i = 0; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};

var music = ramones.includes("Deedee");
console.log(music);

console.log("CASE if an object has an element from index");

var ramones = { 0: "Yoey", 1: "Deedee", 2: "Johnny", 3: "Marky", length: 4 };

ramones.includes = function (element, index) {
  for (i = index; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};

ramones.includes = function (element, index) {
  if (index === 0) index = 0;
  for (i = index; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};

var music = ramones.includes("Johnny");
console.log(music);

var music = ramones.includes("Marky", 2);
console.log(music);

var music = ramones.includes("Johnny", 1);
console.log(music);

var music = ramones.includes("Johnny", 3);
console.log(music);

var music = ramones.includes("Johnny", undefined);
console.log(music);

ramones.includes = function (element, index) {
  if (index === 0) index = 0;
  else if (index < 0) index = this.length + index;
  for (i = index; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};

var music = ramones.includes("Johnny", -4);
console.log(music);

var music = ramones.includes("Johnny", -1);
console.log(music);

var music = ramones.includes("Johnny", -15);
console.log(music);

//TODO implement case for indexOf
console.log("CASE indexOf from objects");
var cats = {
  0: "Gris",
  1: "Lemmy",
  2: "Ozzy",
  3: "Trici",
  4: "Gris",
  length: 4,
};
console.log(cats);

cats.indexOf = function (cat) {
  for (i = 0; i < this.length; i++) {
    if (this[i] === cat) {
      var index = i;

      return index;
    }
  }
  return -1;
};

var catsIndex = cats.indexOf("Lemmy");

console.log(catsIndex);

cats.indexOf = function (element, index) {
  if (index === undefined) index = 0;
  else if (index < 0) index = this.length + index;

  for (i = 0; i < this.length; i++) {
    if (this[i] === element) {
      var index = i;

      return index;
    }
  }
  return -1;
};
var catsIndex = cats.indexOf("Gris", -3);

console.log(catsIndex);

//TODO implement case for reverse
console.log("CASE reverse elements from objects");

const fruits = {
  0: "apple",
  1: "pear",
  2: "cherry",
  3: "watermelon",
  length: 4,
};
console.log(fruits);

fruits.reverse = function () {
  var tmp;
  for (var i = 0; i < this.length - i; i++) {
    tmp = this[i];
    this[i] = this[this.length - i - 1];
    this[this.length - i - 1] = tmp;
  }

  return this;
};

const reversed = fruits.reverse();
console.log(reversed);

//TODO implement case for shift
console.log("CASE remove first element from object");

var societyOfTheSnow = {
  0: "Numa Turcatti",
  1: "Roberto Canessa",
  2: "Nando Parrado",
  3: "Eduardo Strauch",
  length: 4,
};
console.log(societyOfTheSnow);

societyOfTheSnow.shift = function () {
  var element = this[0];
  for (i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }

  delete this[this.length - 1];
  this.length--;
  return element;
};

var removed = societyOfTheSnow.shift();

console.log(removed);
console.log(societyOfTheSnow);
console.log(societyOfTheSnow.length);

//TODO implement case for slice
console.log("CASE slice");
var names = {
  0: "Rita",
  1: "Pedro",
  2: "Miguel",
  3: "Ana",
  4: "Vanesa",
  length: 5,
};
console.log(names);

names.slice = function (begining, end) {
  if (begining === undefined) begining = this.length - 1;
  else if (end < 0) end = this.length + end;
  var newNames = { length: 0 };
  for (i = begining; i < end; i++) {
    newNames[i] = this[i];
    newNames.length++;
  }
  return newNames;
};

var male = names.slice(1, 4);

console.log(male);
console.log(male.length);

//TODO implement case for copyWithin

console.log("CASE copyWithin");
const friends = { 0: "Gonzalo", 1: "Julen", 3: "Lu", 4: "Ro", length: 4 };

friends.copyWithin = function (target, start, end = 0) {
  var item = target;

  if (end === undefined) end = this.length;
  else if (end < 0) end = this.length + end;

  if (start === undefined) start = 0;
  else if (start < 0) start = this.length + start;

  if (end <= start) return this;

  if (target === undefined) target = 0;
  else if (target < 0) target = this.length + target;
  else if (target > start) return this;
  for (var i = start; i < end; i++) {
    this[item] = this[i];
    item++;
  }
  return this;
};

var myFriends = friends.copyWithin(0, 3, 4);

console.log(myFriends);
console.log(friends);

//TODO implement case for lastIndexOf
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
