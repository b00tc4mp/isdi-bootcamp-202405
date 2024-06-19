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

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]

            callback(elem, i, this)
        }
    }

    map(callback) {
        const mapped = new Curray

        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            const mappedElement = callback(element, i, this)

            mapped[i] = mappedElement
            mapped.length++
        }

        return mapped
    }

    concat() {

        const newObject = { length: 0 }

        for (let i = 0; i < this.length; i++) {
            const elem = this[i]

            newObject[newObject.length++] = elem
        }

        for (let i = 0; i < arguments.length; i++) {

            const argument = arguments[i]

            for (let j = 0; j < argument.length; j++) {

                const elem = argument[j]

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

        //else if (target > start)
        //  return this

        let temporal = target;
        for (let i = start; i < end; i++) {
            this[temporal] = this[i]
            temporal++
        }
        return this
    }

    every(callback) {

        for (let i = 0; i < this.length; i++) {

            // if (callback(this[i]) === false)
            if (!callback(this[i]))

                return false

        }

        return true

    }

    fill(value, start, end) {

        if (start === undefined || start < -this.length) {
            start = 0;
        } else if (start < 0) {
            start += this.length;
        } else if (start >= this.length) {
            return this;
        }

        if (end === undefined || end >= this.length) {
            end = this.length;
        } else if (end < 0) {
            end += this.length;
        } else if (end < -this.length) {
            end = 0;
        } else {

            return this;
        }

        for (let i = start; i < end; i++) {

            this[i] = value
        }

        return this

    }

    filter(callbackFunction) {
        const newObject = new Curray

        for (let i = 0; i < this.length; i++) {

            if (callbackFunction(this[i], i, this)) {

                newObject[newObject.length++] = this[i]

            }

        }

        return newObject

    }

    find(callbackFunction) {

        for (let i = 0; i < this.length; i++) {

            if (callbackFunction(this[i], i, this))

                return this[i]

        }

        return undefined

    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]

            callback(elem, i, this)
        }
    }

    includes(element, index) {
        if (index === undefined)
            index = 0

        else if (index < 0)
            index = this.length + index

        for (let i = index; i < this.length; i++) {
            var elem = this[i]

            if (elem === element)
                return true
        }
        return false
    }

    indexOf(searchElement, fromIndex) {

        if (fromIndex === undefined)
            fromIndex = 0

        else if (fromIndex < 0) {
            fromIndex = this.length + fromIndex

            if (fromIndex < 0)
                fromIndex = 0
        }

        for (let i = fromIndex; i < this.length; i++) {
            const element = this[i]

            if (searchElement === element)
                return i
        }

        return -1

    }

    join(separator) {
        if (separator === undefined)
            separator = ','

        let res = ""

        for (let i = 0; i < this.length; i++) {
            const elem = this[i]

            res += elem

            if (i < this.length - 1)
                res += separator

        }

        return res
    }
}

module.exports = Curray