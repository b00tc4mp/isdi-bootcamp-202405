console.info("TEST arrays");

console.info("CASE add elemnts to array");

var a = new Array();
a[0] = 10;
a[1] = 20;
a[2] = 30;

console.info(a);
console.info(a.length);

console.info("CASE remove las element from array");
var a = new Array();

a[0] = 10;
a[1] = 20;
a[2] = 30;
console.info(a);

a.length = a.length - 1;
a.length -= 1;
a.length--;

console.info(a);
console.info(a.length);

console.info("CASE remove last 2 elements from array");

var colors = new Array();

colors[0] = "red";
colors[1] = "green";
colors[2] = "blue";
colors[3] = "yellow";

console.info(colors);

console.info(colors.length);

colors.length -= 2;

console.info(colors);
console.info(colors.length);
