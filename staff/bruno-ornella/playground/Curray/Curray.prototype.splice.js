var Curray = require('./Curray')

Curray.prototype.splice = function (fromIndex, removeCount, element) {
    if (removeCount === 0) {
        for (var i = this.length; i > fromIndex; i--)
            this[i] = this[i - 1]

        this.length++

        this[fromIndex] = element

        return { length: 0 }
    }
    else if (removeCount === 1) {
        var remov = new Curray

        remov[remov.length++] = this[fromIndex]

        this[fromIndex] = element
        return remov
    }

    else if (removeCount === 2) {
        //this = ('yellow', 'green', 'red', 'blue', 'pink', 'skyblue', 'plum', 'brown', 'gray', 'black', 'white') length:11
        //fromIndex = 2
        //removeCount = 2
        //element = 'violet'
        var removed = new Curray
        for (var i = fromIndex; i < fromIndex + removeCount; i++)
            removed[removed.length++] = this[i]
        //removed[removed.length++] = this[2]
        // removed[removed.length++] = this[3]

        for (var i = fromIndex + 1; i < this.length - 1; i++)
            this[i] = this[i + 1]
        delete this[this.length - 1]

        this[this.length--]

        this[fromIndex] = element


        //this[2] = element //(0:'yellow', 1:'green', 2:'violet', 3:'pink', 4:'skyblue', 5:'plum', 6:'brown', 7:'gray', 8:'black', 9:'white')

        return removed
        // this[3] = this[4] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'pink', 5:'skyblue', 6:'plum', 7:'brown', 8:'gray', 9:'black', 10:'white')
        //this[4] = this[5] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'skyblue', 6:'plum', 7:'brown', 8:'gray', 9:'black', 10:'white')
        //this[5] = this[6] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'plum', 6:'plum', 7:'brown', 8:'gray', 9:'black', 10:'white')
        //this[6] = this[7] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'plum', 6:'brown', 7:'brown', 8:'gray', 9:'black', 10:'white')
        //this[7] = this[8] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'plum', 6:'brown', 7:'gray', 8:'gray', 9:'black', 10:'white')
        //this[8] = this[9] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'plum', 6:'brown', 7:'gray', 8:'black', 9:'black', 10:'white')
        //this[9] = this[10] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'plum', 6:'brown', 7:'gray', 8:'black', 9:'white', 10:'white')
        //delete this[10] //(0:'yellow', 1:'green', 2:'red', 3:'pink', 4:'skyblue', 5:'plum', 6:'brown', 7:'gray', 8:'black', 9:'white')


    }

}