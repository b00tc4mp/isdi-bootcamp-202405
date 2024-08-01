const Doctor = require("./Doctor");
const Person = require("./Person");

const ana = new Doctor("Ana", "Thompson", 34, "female");

console.log(ana);
console.log(ana.work("👩‍⚕️"));
console.log(ana.eat("🥗"));
console.log(ana.drive("🚗"));
console.log(ana.heal());
console.log(ana.study("About medicine"));
console.log(ana instanceof Doctor);
console.log(ana instanceof Person);
console.log(ana instanceof Array);
console.log(ana.toString());
