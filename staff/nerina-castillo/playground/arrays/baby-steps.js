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
