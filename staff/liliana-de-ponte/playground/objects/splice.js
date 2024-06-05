console.log('TEST splice')

console.log('CASE splice in object')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }

months.splice = function (start, deleteItem = this.length, ...args) {
    var newObject = { length: 0 }
    if (start < 0) {
        start = this.length + start
        if (start < 0) {
            start = 0
        }
    } else if (start >= this.length) {
        start = this.length

    } else if (start === undefined) {
        return newObject
    }
    if (deleteItem === undefined)
        deleteItem = 0
    else if (deleteItem <= 0)
        deleteItem = 0

    for (var i = start; i < deleteItem; i++) {
        newObject[newObject.length++] = this[start]
        for (var index = start; index < this.length; index++) {
            this[index] = this[index + 1]
        }
        delete this[this.length - 1]
        this.length--;
    }
    for (var i = 0; i < args.length; i++) {
        for (var j = this.length; j > start; j--)
            this[j] = this[j - 1]
        this.length++
        this[i + start] = args[i]
    }

    return newObject
}


months.splice(1, 0, 'Feb');
// Inserts at index 1

console.log(months);
//{0: Jan, 1: Feb, 2:March, 3:April, 4:June, length:5}

months.splice(4, 1, 'May');

console.log(months);
//{0: Jan, 1: Feb, 2: March, 3:April, 4:May, length: 5}
