function Curray() {
    for (var i = 0; i < arguments.length; i++){
        var argument = argument[i]

        this[i] = argument
    }

    this.length = arguments.length
}
module.exports = Curray