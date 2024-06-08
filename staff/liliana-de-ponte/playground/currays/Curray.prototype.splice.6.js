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
        var removed = new Curray

        for (var i = fromIndex; i < fromIndex + removeCount; i++)
            removed[i - fromIndex] = this[i]

        removed.length = removeCount

        for (var i = fromIndex + removeCount; i < this.length; i++)
            this[i - 1] = this[i]

        delete this[this.length - 1]
        this.length -= removeCount - 1

        this[fromIndex] = element

        return removed
    } else if (removeCount === 3) {
        var removed = new Curray

        for (var i = fromIndex; i < fromIndex + removeCount; i++)
            removed[i - fromIndex] = this[i]

        removed.length = removeCount

        // fromIndex -> 4
        // removeCount -> 3
        // element -> watermelon

        // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'strawberry', 6: 'pinapple', 7: 'peach', length: 8 }
        this[fromIndex + 1] = this[this.length - 1] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 6: 'pinapple', 7: 'peach', length: 8 }

        //delete this[6] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 7: 'peach', length: 8 }
        //delete this[7] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', length: 8 }
        for (var i = fromIndex + removeCount - 1; i < this.length - 1; i++)
            delete this[i]

        this.length = this.length - (removeCount - 1) // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', length: 6 }

        this[fromIndex] = element // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'watermelon', 5: 'peach', length: 6 }

        return removed
    }
}