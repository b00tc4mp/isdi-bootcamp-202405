function Curray() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        this.length = arguments[0]
    }
    else {
        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i]
            this[i] = argument
        }

        this.length = arguments.length
    }

}
module.exports = Curray