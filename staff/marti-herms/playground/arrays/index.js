console.log('TEST arrays');

console.log('CASE add elements to array');

var a = new Array;

a[0] = 10;
a[1] = 20;
a[2] = 30;

console.log(a);
//[10, 20, 30]
console.log(a.length);
//3



console.log('CASE remove last element from array');

var a = new Array;

a[0] = 10;
a[1] = 20;
a[2] = 30;

console.log(a);
//[10, 20, 30]
console.log(a.length);
//3

//a.length = a.length - 1;
//a.length -= 1;
a.length--;

console.log(a);
// [10, 20] 
console.log(a.length);
//2



console.log('CASE remove last 2 elements from array');

var colors = new Array;

colors[0] = 'red';
colors[1] = 'green';
colors[2] = 'blue';
colors[3] = 'yellow';

console.log(colors);
//[res, green, blue, yellow]
console.log(colors.length);
//4

//colors.length = colors.length -2;
colors.length -= 2;

console.log(colors);
//[red, green]
console.log(colors.length);
//2



console.log('CASE push and pop an element to array');

var cars = new Array;

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 };
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 };
cars[2] = { brand: 'fiat', model: '500', year: 2017 };

console.log(cars);
//[{...},{...}{...}]
console.log(cars.length);

console.log(cars.push({ brand: 'ford', model: 'fiesta', year: 2005 }));

console.log(cars);
//[{...},{...},{...},{...}]
console.log(cars.length);
//4

console.log(cars.pop());
console.log(cars)



console.log('CASE push multiple elements to array');

var animals = ['pigs', 'goats', 'sheep', 'cows'];

console.log(animals);
//['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length);
//4

var count = animals.push('chickens', 'cats', 'dogs');

console.log(animals);
//['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
console.log(animals.length);
//7



console.log('CASE return value of index in array')

var nums = [5, 12, 8, 130, 44];

console.log(nums);
//[5, 12, 8, 130, 44]
console.log(nums.length);
//5

var index = 3;

console.log(nums.at(index));
//130

var index = -3;

console.log(nums.at(index));
//8



console.log('CASE concat two arrays');

var char1 = ['a', 'b', 'c'];
var char2 = ['d', 'f', 'g'];

console.log(char1);
//['a', 'b', 'c']
console.log(char2);
//['d', 'f', 'g']

var char3 = char1.concat(char2);

console.log(char3);
//['a', 'b', 'c', 'd', 'f', 'g']



console.log('CASE concat elements from 5 arrays')

var nums1 = [10, 20, 30]
var nums2 = [400, 500]
var nums3 = [-60, -70]
var nums4 = [800, 900]
var nums5 = [-1000]

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.log(nums1)
// [10, 20, 30]
console.log(nums2)
// [400, 500]
console.log(nums3)
// [-60, -70]
console.log(nums4)
// [800, 900]
console.log(nums5)
// [-1000]

console.log(nums6)
// [10, 20, 30, 400, 500, -60, -70, 800, 900, -1000]

// TODO implement case for join
// TODO implement case for includes
// TODO implement case for indexOf
// TODO implement case for lastIndexOf
// TODO implement case for slice
// TODO implement case for reverse
// TODO implement case for shift
// TODO implement case for copyWithin



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



console.log('CASE check element in array');

var pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
//true

console.log(pets.includes('at'));
//false



console.log('CASE first index of element in array');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
//1

console.log(beasts.indexOf('bison', 2));
//4

console.log(beasts.indexOf('giraffe'));
//-1



console.log('CASE last index of element in array');

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
//3

console.log(animals.lastIndexOf('Tiger'));
//



console.log('CASE copy fragment of array');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals);
//['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(2));
//['camel', 'duck', 'elephant']

console.log(animals.slice(2, 4));
//['camel', 'duck']

console.log(animals.slice(1, 5));
//['bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(-2));
//['duck', 'elephant']

console.log(animals.slice(2, -1));
//['camel', 'duck']

console.log(animals.slice());
//['ant', 'bison', 'camel', 'duck', 'elephant']


console.log('CASE reverse the entire array !!IN PLACE!!')

var array1 = ['one', 'two', 'three'];

console.log(array1);
//['one', 'two', "three']

var reversed = array1.reverse();
console.log(reversed);
//['three', 'two', 'one']

console.log(array1);
//['three', 'two', 'one']



console.log('CASE remove first element of array');

var array1 = [1, 2, 3];

console.log(array1);
//[1, 2, 3]

var firstElement = array1.shift();

console.log(array1);
//[2, 3]

console.log(firstElement);
//1



console.log('CASE copy fragment of array inside of the array');

var array1 = ['a', 'b', 'c', 'd', 'e'];

console.log(array1);
//['a', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(0, 3, 4));
//['d', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(1, 3));
//['d', 'd', 'e', 'd', 'e']