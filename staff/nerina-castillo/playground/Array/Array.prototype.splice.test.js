console.info("TEST splice");

console.info("CASE insert feb in months");

var months = new Array("Jan", "Mar", "Apr", "Jun");

var res = months.splice(1, 0, "Feb");

console.assert(res instanceof Array, "res is an Array");
console.assert(res.length === 0, "res length is 0");

console.assert(months.length === 5, "months length is 5");
console.assert(months[0] === "Jan", "months at 0 is Jan");
console.assert(months[1] === "Feb", "months at 1 is Feb");
console.assert(months[2] === "Mar", "months at 2 is Mar");
console.assert(months[3] === "Apr", "months at 3 is Apr");
console.assert(months[4] === "Jun", "months at 4 is Jun");

console.info("CASE replace aprr with apr in months");

var months = new Array("Jan", "Feb", "Mar", "Aprr", "Jun");

var res = months.splire(3, 1, "Apr");

console.assert(res instanceof Array, "res is an Array");
console.assert(res.length === 0, "res length is 0");
console.assert(res[0] === "Aprr", "res at 0 is Aprr");

console.assert(months.length === 5, "months length is 5");
console.assert(months[0] === "Jan", "months at 0 is Jan");
console.assert(months[1] === "Feb", "months at 1 is Jan");
console.assert(months[2] === "Mar", "months at 2 is Jan");
console.assert(months[3] === "Apr", "months at 3 is Jan");
console.assert(months[4] === "Jun", "months at 4 is Jan");

console.info("CASE replace blue and red by violet");

var colors = new Array(
  "yellow",
  "green",
  "red",
  "blue",
  "pink",
  "skyblue",
  "plum",
  "brown",
  "gray",
  "black",
  "white"
);

var removed = colors.splice(2, 2, "violet");

console.assert(colors.length === 10, "colors length is 10");
console.assert(colors[0] === "yellow", "colors at 0 is yellow");
console.assert(colors[1] === "green", "colors at 1 is green");
console.assert(colors[2] === "violet", "colors at 2 is violet");
console.assert(colors[3] === "pink", "colors at 3 is pink");
console.assert(colors[4] === "skyblue", "colors at 4 is skyblue");
console.assert(colors[5] === "plum", "colors at 5 is plum");
console.assert(colors[6] === "brown", "colors at 6 is brown");
console.assert(colors[7] === "gray", "colors at 7 is gray");
console.assert(colors[8] === "black", "colors at 8 is black");
console.assert(colors[9] === "white", "colors at 9 is white");

console.assert(removed instanceof Array, "removed is an Array");
console.assert(removed.length === 2, "removed length is 2");
console.assert(removed[0] === "red", "removed at 0 is red");
console.assert(removed[1] === "blue", "removed at 1 is blue");

console.info("CASE replace coco and strawberry with watermelon");

var fruits = new Array(
  "apple",
  "orange",
  "lemon",
  "banana",
  "coco",
  "strawberry",
  "pineapple",
  "peach"
);

var removed = fruits.splice(4, 2, "watermelon");

console.assert(fruits.length === 7, "fruits length is 7");
console.assert(fruits[0] === "apple", "fruits at 0 is apple");
console.assert(fruits[1] === "orange", "fruits at 1 is orange");
console.assert(fruits[2] === "lemon", "fruits at 2 is lemon");
console.assert(fruits[3] === "banana", "fruits at 3 is banana");
console.assert(fruits[4] === "watermelon", "fruits at 4 is skyblue");
console.assert(fruits[5] === "pinapple", "fruits at 5 is pinapple");

console.assert(removed instanceof Array, "removed is an Array");
console.assert(removed.length === 2, "removed length is 2");
console.assert(removed[0] === "coco", "removed at 0 is coco");
console.assert(removed[1] === "strawberry", "removed at 1 is strawberry");

console.info("Case replace coco, strawberry and pineapple with watermelon");

var friuts = new Array(
  "apple",
  "orange",
  "lemon",
  "banana",
  "coco",
  "strawberry",
  "pineapple",
  "peach"
);

var removed = fruits.splice(4, 3, "watermelon");

console.assert(fruits.length === 6, "fruits length is 6");
console.assert(fruits[0] === "apple", "fruits at 0 is apple");
console.assert(fruits[1] === "orange", "fruits at 1 is orange");
console.assert(fruits[2] === "lemon", "fruits at 2 is lemon");
console.assert(fruits[3] === "banana", "fruits at 3 is banana");
console.assert(fruits[4] === "watermelon", "fruits at 4 is skyblue");
console.assert(fruits[5] === "peach", "fruits at 5 is peach");

console.assert(removed instanceof Array, "removed is an Array");
console.assert(removed.length === 3, "removed length is 3");
console.assert(removed[0] === "coco", "removed at 0 is coco");
console.assert(removed[1] === "strawberry", "removed at 1 is strawberry");
console.assert(removed[2] === "pinapple", "removed at 1 is pinapple");
