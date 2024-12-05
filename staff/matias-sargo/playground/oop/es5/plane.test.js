var Car = require("./cars")
var Plane = require("./plane")

var airbus = new Plane(2000, "airbus", "A320", "Turbofan", "white", "RD123456")

console.log(airbus.departure())
console.log(airbus.turbulence())
console.log(airbus.toString())
console.log(airbus instanceof Plane)
console.log(airbus instanceof Object)
console.log(airbus instanceof Array)
console.log(airbus)