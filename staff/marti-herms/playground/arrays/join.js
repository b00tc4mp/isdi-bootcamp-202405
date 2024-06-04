console.log('TEST join')

console.log('CASE join elements in array');

var elements = ['Fire', 'Earth', 'Water'];

var str1 = elements.join();
var str2 = elements.join('');
var str3 = elements.join('-');

console.log(str1);
//'Fire,Earth,Water'
console.log(str2);
//'FireEarthWater'
console.log(str3);
//'Fire-Earth-Water'