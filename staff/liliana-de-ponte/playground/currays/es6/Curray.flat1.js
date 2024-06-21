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
    flat() {
        var flatted = new Curray()

        for (let i = 0; i < this.length; i++) {
            var element = this[i]

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