class Curray {
    constructor() {
        if (arguments.length === 1 && typeof arguments[0] === 'number')
            this.length = arguments[0]
        else {
            for (var i = 0; i < arguments.length; i++) {
                var argument = arguments[i]

                this[i] = argument
            }

            this.length = arguments.length
        }
    }

    at(index) {
        if (index > -1)
            return this[index]
        else
            return this[this.length + index]
    }
    concat() {

        var newObject = { length: 0 }

        for (var i = 0; i < this.length; i++) {
            var elem = this[i]

            newObject[newObject.length++] = elem
        }

        for (var i = 0; i < arguments.length; i++) {

            var argument = arguments[i]

            for (var j = 0; j < argument.length; j++) {

                var elem = argument[j]

                newObject[newObject.length++] = elem

            }

        }

        return newObject

    }
    copyWithin(target, start, end) {
        if (end === undefined)
            end = this.length

        else if (end < 0)
            end = this.length + end


        if (start === undefined)
            start = 0

        else if (start < 0)
            start = this.length + start

        if (end <= start)
            return this

        if (target === undefined)
            target = 0

        else if (target < 0)
            target = this.length + target

        var temporal = target;
        for (var i = start; i < end; i++) {
            this[temporal] = this[i]
            temporal++
        }
        return this
    }
    every(callback) {
        for (var i = 0; i < this.length; i++) {

            if (!callback(this[i]))

                return false
        }
        return true
    }
    filter(callback) {
        var elem = { length: 0 }
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this))
                elem[elem.length++] = this[i]

        }
        return elem

    }
    find(callBlackFuction) {
        for (var i = 0; i < this.length; i++) {
            if (callBlackFuction(this[i], i, this))
                return this[i]
        }
        return undefined
    }
    findIndex(callbackFunction) {
        for (var i = 0; i < this.length; i++) {
            if (callbackFunction(this[i], i, this))

                return i
        }

        return -1
    }

    findLast(callback) {

        for (var i = this.length - 1; i > 0; i--) {

            if (callback(this[i], i, this))

                return this[i]

        }

        return undefined

    }

    includes(element, index) {
        if (index === undefined)
            index = 0

        else if (index < 0)
            index = this.length + index

        for (i = index; i < this.length; i++) {
            var elem = this[i]

            if (elem === element)
                return true
        }
        return false
    }
    indexOf(animalName) {
        for (var i = 0; i < this.length; i++) {
            var element = this[i]
            if (animalName === element) {
                return i
            }
        }
        return -1
    }
    join(separator) {
        if (separator === undefined)
            separator = ','

        var res = ""

        for (var i = 0; i < this.length; i++) {
            var elem = this[i]

            res += elem

            if (i < this.length - 1)
                res += separator

        }

        return res
    }
    keys() {
        var i = 0

        var self = this

        return {
            next: function () {
                return {
                    value: i < self.length ? i : undefined,
                    done: ++i > self.length
                }
            }
        }
    }
    lastIndexOf(zooname, fromIndex) {

        if (fromIndex === undefined) {

            fromIndex = this.length - 1

        } else if (fromIndex < 0) {

            fromIndex = this.length + fromIndex

        }

        for (var index = fromIndex; index > -1; index--) {

            if (zooname === this[index]) {

                return index
            }
        }
        return -1
    }
    map(callbackFunction) {
        var newObject = { length: 0 }
        for (var i = 0; i < this.length; i++) {
            newObject[newObject.length++] = callbackFunction(this[i], i, this)
        }
        return newObject
    }
    pop() {
        var element = this[this.length - 1]

        // delete this[this.length - 1]
        // this.length--
        delete this[--this.length]

        return element
    }
    push() {
        for (var index = 0; index < arguments.length; index++) {
            var argument = arguments[index]

            this[this.length++] = argument
        }

        return this.length
    }
    reverse() {
        var temp;
        for (var i = 0; i < this.length - i; i++) {
            temp = this[i]
            this[i] = this[this.length - i - 1]
            this[this.length - i - 1] = temp
        }
        return this
    }
    shift() {

        var deletedAnimal = this[0]

        this.length--

        for (var i = 0; i < this.length; i++) {

            this[i] = this[i + 1]

        }

        delete this[this.length]

        return deletedAnimal
    }
    some(element) {
        for (let i = 0; i < this.length; i++) {
            if (element(this[i]))
                return true
        }
        return false
    }
    splice(fromIndex, removeCount, element) {
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

            var removed = new Curray
            for (var i = fromIndex; i < fromIndex + removeCount; i++)
                removed[removed.length++] = this[i]


            for (var i = fromIndex + 1; i < this.length - 1; i++)
                this[i] = this[i + 1]
            delete this[this.length - 1]

            this[this.length--]

            this[fromIndex] = element


            return removed

        }

    }
    toString() {
        var string = ''

        for (var i = 0; i < this.length; i++) {
            string += this[i]

            if (i < this.length - 1)
                string += ','
        }

        return string
    }
    values() {
        var i = 0

        var self = this

        return {
            next: function () {
                return {
                    value: i < self.length ? self[i] : undefined,
                    done: ++i > self.length,
                }
            }
        }
    }

}

module.exports = Curray