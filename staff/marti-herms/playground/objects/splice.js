console.log('TEST splice');

console.log('CASE remvoe a section of an object');

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 };

months.splice = function (start, deleteCount = this.length, ...item) {
    var newObject = { length: 0 }

    if (start < 0 && start >= -this.length) {
        start = start + this.length;
    } else if (start < -this.length) {
        start = 0;
    } else if (start >= this.length) {
        start = this.length;
    } else if (start === undefined) {
        return newObject;
    }

    if (deleteCount < 0 || deleteCount === undefined) {
        deleteCount = 0;
    }

    for (var i = start; i < start + deleteCount; i++) {
        newObject[newObject.length++] = this[i];
        for (var j = start; j < this.length; j++) {
            this[j] = this[j + 1];
        }
        delete this[--this.length];
    }
    for (var i = 0; i < item.length; i++) {
        for (var j = this.length; j > start; j--) {
            this[j] = this[j - 1];
        }
        this[start + i] = item[i];
        this.length++;
    }

    return newObject;
}

console.log(months.splice(1, 0, 'Feb'));
//{ length: 0 }
console.log(months);
//{ 0: "Jan", 1: "Feb", 2: "March", 3: "April", 4: "June", length: 5 }

console.log(months.splice(4, 1, 'May'));
//{ 0: 'June', length: 1}
console.log(months);
//{ 0: "Jan", 1: "Feb", 2: "March", 3: "April", 4: "May", length: 5 }