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