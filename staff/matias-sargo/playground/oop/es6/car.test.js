const Car = require("./cars")
const bmw = new Car(2005, "bmw", "M3", "V8", "metallic-Blue", "GSG_0525")

console.log(bmw.start());           // Output: "brrrrm"
console.log(bmw.brake());           // Output: "red-light"
bmw.shift_up();
console.log(bmw.full_throttle());   // Output: "Low Fuel"
console.log(bmw.toString())
