var Curray = require('./Curray')

Curray.prototype.splice = function (fromIndex, removeCount, element) {
    if (removeCount === 0) {
        for (var i = this.length; i > fromIndex; i--)
            this[i] = this[i - 1]

        this.length++

        this[fromIndex] = element

        return new Curray
    } else if (removeCount === 1) {
        var removed = new Curray

        removed[removed.length++] = this[fromIndex]

        this[fromIndex] = element

        return removed
    } else if (removeCount === 2) {
        // this -> Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'blue', 4: 'pink', 5: 'skyblue', 6: 'plum', 7: 'brown', 8: 'gray', 9:'black', 10:'white', length: 11 }
        // fromIndex -> 2
        // removeCount -> 2
        // element -> violet

        var removed = new Curray // Curray { length: 0 }

        // TODO ...

        //removed[0] = this[2] // Curray { 0: 'red', length: 0 }
        //removed[1] = this[3] // Curray { 0: 'red', 1: 'blue', length: 0 }
        // for (var i = 0; i < 2; i++)
        //     removed[i] = this[2 + i]
        for (var i = 2; i < 4; i++)
            removed[i - 2] = this[i]


        removed.length = 2 // Curray { 0: 'red', 1: 'blue', length: 2 }

        // this[3] = this[4] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'pink', 5: 'skyblue', 6: 'plum', 7: 'brown', 8: 'gray', 9:'black', 10:'white', length: 11 }
        // this[4] = this[5] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'skyblue', 6: 'plum', 7: 'brown', 8: 'gray', 9:'black', 10:'white', length: 11 }
        // this[5] = this[6] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'plum', 7: 'brown', 8: 'gray', 9:'black', 10:'white', length: 11 }
        // this[6] = this[7] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'brown', 7: 'brown', 8: 'gray', 9:'black', 10:'white', length: 11 }
        // this[7] = this[8] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'brown', 7: 'gray', 8: 'gray', 9:'black', 10:'white', length: 11 }
        // this[8] = this[9] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'brown', 7: 'gray', 8: 'black', 9:'black', 10:'white', length: 11 }
        // this[9] = this[10] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'brown', 7: 'gray', 8: 'black', 9: 'white', 10:'white', length: 11 }
        // for (var i = 3; i < 10; i++)
        //     this[i] = this[i + 1]
        for (var i = 4; i < 11; i++)
            this[i - 1] = this[i]

        delete this[10] // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'brown', 7: 'gray', 8: 'black', 9: 'white', length: 11 }
        this.length = 10 // Curray { 0: 'yellow', 1: 'green', 2: 'red', 3: 'pink', 4: 'skyblue', 5: 'plum', 6: 'brown', 7: 'gray', 8: 'black', 9: 'white', length: 10 }

        this[2] = element

        return removed
    }
}