console.log("TEST arrays");

console.log("CASE add elemnts to array");

var a = new Array();
a[0] = 10;
a[1] = 20;
a[2] = 30;

console.log(a);
console.log(a.length);

console.log("CASE remove las element from array");
var a = new Array();

a[0] = 10;
a[1] = 20;
a[2] = 30;
console.log(a);

a.length = a.length - 1;
a.length -= 1;
a.length--;

console.log(a);
console.log(a.length);

console.log("CASE remove last 2 elements from array");

var colors = new Array();

colors[0] = "red";
colors[1] = "green";
colors[2] = "blue";
colors[3] = "yellow";

console.log(colors);

console.log(colors.length);

colors.length -= 2;

console.log(colors);
console.log(colors.length);

console.log("CASE push an element to array");

var cars = new Array();

cars[0] = { brand: "ferrari", model: "gta", year: 1990 };
cars[1] = { brand: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { brand: "fiat", model: "500", year: 2017 };

console.log(cars);

console.log(cars.length);

cars.push({ brand: "ford", model: "fiesta", year: 2005 });
console.log(cars);
console.log(cars.length);

console.log(cars.length);

console.log("CASE remove last element from array with .pop()");

var cars = new Array();
cars[0] = { brand: "ferrari", model: "gta", year: 1990 };
cars[1] = { brand: "lamborgini", model: "murcielago", year: 2010 };
cars[2] = { brand: "fiat", model: "500", year: 2017 };
cars[3] = { brand: "ford", model: "fiesta", year: 2005 };

var cars2 = cars.pop();
console.log(cars);
console.group(cars.length);
console.log(cars2);

console.log("CASE element at index");

var nums = [5, 12, 8, 130, 44];
console.log(nums);
console.log(nums.length);

var num = nums.at(3);
console.log(num);

var num = nums.at(-3);

console.log(num);

console.log("CASE concat elements from two arrays");

var chars1 = ["a", "b", "c"];
var chars2 = ["d", "e", "f"];
var chars3 = chars1.concat(chars2);

console.log(chars1);

console.log(chars2);

console.log(chars3);

var chars3 = chars1.concat(chars2);

console.log(chars3);

console.log("CASE concat elements from 5 arrays");

var num1 = [10, 20, 30];
var num2 = [400, 500];
var num3 = [-60, -70];
var num4 = [800, 900];
var num5 = [-1000];

var num6 = num1.concat(num2, num3, num4, num5);

console.log(num1);
console.log(num2);
console.log(num3);
console.log(num4);
console.log(num5);
console.log(num6);

//TODO implement case for join
console.log("CASE join elements in a string");

const elements = ["Fire", "Air", "Water"];

var joinedElements = elements.join();

console.log(joinedElements);

console.log("CASE join elements with separator");

var things = [
  true,
  "hello world",
  100,
  { name: "Oswald" },
  [10, 20, 30],
  function () {},
];
var joined = things.join(" $ ");

console.log(joined);

console.log("CASE join elements without separator");

var things = [
  true,
  "hello world",
  100,
  { name: "Oswald" },
  [10, 20, 30],
  function () {},
];
var joined = things.join();

console.log(joined);

var joined = things.join(undefined);

console.log(joined);

var joined = things.join("");

console.log(joined);

//TODO implement case for includes
console.log("CASE if an array has an element");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Deedee");
console.log(music);

console.log("CASE if an array has an element from index");

var ramones = ["Yoey", "Deedee", "Johnny", "Marky"];

var music = ramones.includes("Marky", 2);
console.log(music);

var music = ramones.includes("Johnny", 1);
console.log(music);

var music = ramones.includes("Johnny");
console.log(music);

var music = ramones.includes("Johnny", undefined);
console.log(music);

var music = ramones.includes("Johnny", -4);
console.log(music);

var music = ramones.includes("Johnny", -15);
console.log(music);

//TODO implement case for indexOf
console.log("CASE indexOf");
var cats = ["Gris", "Lemmy", "Ozzy", "Trici", "Gris"];
var catsIndex = cats.indexOf("Gris", 2);

console.log(catsIndex);

//TODO implement case for reverse
console.log("CASE reverse elements from array");

const fruits = ["apple", "pear", "cherry", "watermelon"];
console.log(fruits);

const reversed = fruits.reverse();
console.log(reversed);

//TODO implement case for shift
console.log("CASE remove first element from array");

var societyOfSnow = [
  "Numa Turcatti",
  "Roberto Canessa",
  "Nando Parrado",
  "Eduardo Strauch",
];

console.log(societyOfSnow);

var removed = societyOfSnow.shift();

console.log(societyOfSnow);

console.log(societyOfSnow.length);

//TODO implement case for slice
console.log("CASE slice");
var nombres = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];
console.log(nombres);

var masculinos = nombres.slice(1, 3);

console.log(masculinos);
console.log(masculinos.length);

//TODO implement case for copyWithin
console.log("CASE copyWithin");
var array1 = ["a", "b", "c", "d", "e"];

var array2 = array1.copyWithin(0, 3, 4);
console.log(array2);
console.log(array2);

//TODO implement case for lastIndexOf
console.log("CASE lastIndexOf");
var animals = ["Dodo", "Tiger", "Lion", "Dodo"];

var animalIndex = animals.indexOf("Tiger");

console.log(animalIndex);

var animalIndex = animals.indexOf("Lion", 2);

console.log(animalIndex);

var animalIndex = animals.indexOf("Lion", -2);

console.log(animalIndex);
