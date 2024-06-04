console.log('TEST for each')
console.log('CASE implement for Each from arrays')

var numbers = { 0: '1', 1: '2', 2: '3', length: 3 };

numbers.forEach = function (callbackFunction) {

    for (var i = 0; i < this.length; i++) {

        callbackFunction(this[i], i, this)
    }


}

var printNumber = function (numbers) {
    console.log(numbers)
}

numbers.forEach(printNumber)
//1
//2
//3

numbers.forEach(function (number, index, currentObject) {

    console.log(number, index, currentObject)
})

// 1 0 {
//     '0': '1',
//     '1': '2',
//     '2': '3',
//     length: 3,
//   }
//
// 2 1 {
//     '0': '1',
//     '1': '2',
//     '2': '3',
//     length: 3,
//   }
//
//  3 2 {
//     '0': '1',
//     '1': '2',
//     '2': '3',
//     length: 3,
//   }
