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
                            for (let i = 0; i < element.length; i++) {
                                const elem1 = elem[i]

                                flatted[flatted.length++] = elem1
                            }
                    }
            }

            return flatted
        } else if (depth === 3 || depth === Infinity) {
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

                                if (!(elem instanceof Curray))
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
        } else if (depth === 4) {
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

                                        if (!(elem2 instanceof Curray))
                                            flatted[flatted.length++] = elem2
                                        else
                                            for (let i = 0; i < elem2.length; i++) {
                                                const elem3 = elem2[i]

                                                flatted[flatted.length++] = elem3
                                            }
                                    }
                            }
                    }
            }

            return flatted
        }
    }
}



module.exports = Curray