const Curray = require("./Curray")
require("./Curray.prototype.toString")

console.info("TEST Curray.prototype.toString")

console.info("CASE toString in curray")

const array = new Curray(1, 2, "a", "1a")

const arrayString = array.toString()

console.assert(arrayString === "1,2,a,1a", "arrayString is 1,2,a,1a")