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

    flat(depth) {
        if (depth === undefined) {
            const flatted = new Curray()

            for (let i = 0; i < this.length; i++) {
                const element = this[i]

                if (!(element instanceof Curray))
                    flatted[flatted.length++] = element
                else
                    for (let i = 0; i < element.length; i++) {
                        const elem = element[i]

                        flatted[flatted.length++] = elem
                    }
            }

            return flatted
        } else if (depth === 2) {
            const flatted = new Curray()

            for (let i = 0; i < this.length; i++) {
                const element = this[i]

                if (!(element instanceof Curray))
                    flatted[flatted.length++] = element
                else
                    for (let i = 0; i < element.length; i++) {
                        const elem = element[i]

                        if (!(elem instanceof Curray))
                            flatted[flatted.length++] = elem
                        else
                            for (let i = 0; i < elem.length; i++) {
                                const elem1 = elem[i]

                                flatted[flatted.length++] = elem1
                            }
                    }
            }

            return flatted
        } else if (depth === 3) {
            const flatted = new Curray()

            for (let i = 0; i < this.length; i++) {
                const element = this[i]

                if (!(element instanceof Curray))
                    flatted[flatted.length++] = element
                else
                    for (let i = 0; i < element.length; i++) {
                        const elem = element[i]

                        if (!(elem instanceof Curray))
                            flatted[flatted.length++] = elem
                        else
                            for (let i = 0; i < elem.length; i++) {
                                const elem1 = elem[i]

                                if (!(elem1 instanceof Curray))
                                    flatted[flatted.length++] = elem1
                                else
                                    for (let i = 0; i < elem1.length; i++) {
                                        const elem2 = elem1[i]

                                        flatted[flatted.length++] = elem2
                                    }
                            }
                    }
            }

            return flatted
        }
    }
}

module.exports = Curray