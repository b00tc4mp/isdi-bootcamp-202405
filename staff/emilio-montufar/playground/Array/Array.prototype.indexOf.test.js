console.log('Test Array indexOf')

console.log('Case inde of in Array')

var car = new Array();

var car = ["ferrari", "toyota", "mazda", "kia", "mercedez", "ferrari"]

var carIndex = car.indexOf("ferrari")

console.assert(carIndex === 0, "Ferrari is in position 0")

onsole.log("CASE index of car in Array of from index")

var carIndex = car.indexOf("ferrari", 2)
console.assert(carIndex === 5, "Ferrari is in position 5")