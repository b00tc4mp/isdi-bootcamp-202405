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

    flat(depth = 1) {
        const flatted = new Curray()

        function loop(curray, count) {
            for (let i = 0; i < curray.length; i++) {
                const element = curray[i]

                if (!(element instanceof Curray) || count === depth)
                    flatted[flatted.length++] = element
                else
                    loop(element, count + 1)
            }
        }

        loop(this, 0)

        return flatted
    }
}

module.exports = Curray