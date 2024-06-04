console.log('TEST lastIndexOf')
cons
ole.log('CASE element at lastIndexOf')

var zoo = { 0: 'Giraffe', 1: 'Tiger', 2: 'Giraffe', 3: 'Penguin', length: 4 };

console.log(zoo)
// {0: 'Giraffe',1: 'Tiger', 2:'Penguin',3: 'Giraffe'}

zoo.lastIndexOf = function (zooName, fromIndex) {
    if (fromIndex === undefined)
        fromIndex = this.length - 1

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i > -1; i--) {
        var elem = this[i]
        if (zooName === elem)
            return i
    }
    return -1
}


var lastIndexOf1 = zoo.lastIndexOf('Giraffe')

var lastIndexOf2 = zoo.lastIndexOf('Tiger')

var lastIndexOf3 = zoo.lastIndexOf('Elephant')

var lastIndexOf4 = zoo.lastIndexOf('Giraffe', 2);

var lastIndexOf5 = zoo.lastIndexOf('Giraffe', -2)

console.log(lastIndexOf1);
//2

console.log(lastIndexOf2);
//1

console.log(lastIndexOf3)
//-1

console.log(lastIndexOf4)
//0

console.log(lastIndexOf5)
//0


