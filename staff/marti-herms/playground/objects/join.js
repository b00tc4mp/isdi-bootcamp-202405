console.log('TEST join')

console.log('CASE join elements in object');

var elements = { 0: 'Fire', 1: 'Earth', 2: 'Water', length: 3 };

console.log(elements);
//{ 0: 'Fire', 1: 'Earth', 2: 'Water', length: 3 }

elements.join = function (separator = ',') {
    var finalString = '';
    /*if (separator === null) {
        for (var i = 0; i < this.length; i++) {
            finalString += this[i];
            if (i < this.length -1) {
                finalString += ',';
            }
        }
        return finalString
    } else {
        for (var i = 0; i < this.length; i++) {
            if (i === this.length - 1) {
                finalString += (this[i]);
            } else {
                finalString += (this[i] + separator);
            }
        }
        return finalString;
    }
    */
    for (var i = 0; i < this.length; i++) {
        finalString += this[i];
        if (i < this.length - 1) {
            finalString += separator;
        }
    }
    return finalString;
}

var str1 = elements.join();
var str2 = elements.join('');
var str3 = elements.join('-');

console.log(str1);
//'Fire,Earth,Water'
console.log(str2);
//'FireEarthWater'
console.log(str3);
//'Fire-Earth-Water'