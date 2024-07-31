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

    flat() {
        const flatted = new Curray()

        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            if (!(element instanceof Curray))
                flatted[flatted.length++] = element
            else
                for (let j = 0; j < element.length; j++) {
                    const elem = element[j]

                    flatted[flatted.length++] = elem
                }
        }

        return flatted
    }
}

module.exports = Curray