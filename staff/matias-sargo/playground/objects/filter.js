console.log("TEST filter in objects")

var words = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 }

words.filter = function (callbackfunction) {
    var newObjects = { length: 0 }

    for (i = 0; i < this.length; i++) {
        if (callbackfunction(this[i], i, this)) {
            newObjects[newObjects.length++] = this[i]
        }
    }

    return newObjects
}


var result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

