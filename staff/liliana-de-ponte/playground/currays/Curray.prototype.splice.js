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

        for (var i = fromIndex + removeCount; i < this.length; i++)
            this[i - (removeCount - 1)] = this[i]

        // fromIndex -> 4
        // removeCount -> 3
        // element -> watermelon

        // this -> Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'strawberry', 6: 'pinapple', 7: 'peach', 8: 'acai', 9: 'papaya', length: 10 }

        //     this[5] = this[7] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 6: 'pinapple', 7: 'peach', 8: 'acai', 9: 'papaya', length: 10 }
        // this[6] = this[8] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 6: 'acai', 7: 'peach', 8: 'acai', 9: 'papaya', length: 10 }
        // this[7] = this[9] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 6: 'acai', 7: 'papaya', 8: 'acai', 9: 'papaya', length: 10 }

        // delete this[8] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 6: 'acai', 7: 'papaya', 9: 'papaya', length: 10 }
        // delete this[9] // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'coco', 5: 'peach', 6: 'acai', 7: 'papaya', length: 10 }

        // this[fromIndex] = element // Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'watermelon', 5: 'peach', 6: 'acai', 7: 'papaya', length: 10 }
        // this.length = 8 //// Curray { 0: 'apple', 1: 'orange', 2: 'lemon', 3: 'banana', 4: 'watermelon', 5: 'peach', 6: 'acai', 7: 'papaya', length: 8 }

        // TODO correct following code to support new test case




        //         this[fromIndex + 1] = this[this.length - 1] // ?
        //         for (var i = fromIndex + removeCount - 1; i < this.length - 1; i++)
        //             delete this[i]

        //         this.length = this.length - (removeCount - 1) // ?

        //         this[fromIndex] = element // ?

        this[fromIndex] = element
        this.length = this.length - (removeCount - 1)

        return removed
    }
}