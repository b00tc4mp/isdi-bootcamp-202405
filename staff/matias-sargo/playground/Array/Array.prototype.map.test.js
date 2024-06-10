console.info('TEST Array.prototype.map')

console.info('CASE map numbers to each one multiplied by 2')

var nums = [1, 4, 9, 16]

var numsBy2 = nums.map(function (num) { return num * 2 })

console.assert(numsBy2 instanceof Array, 'numsBy2 is an Array')
console.assert(numsBy2[0] === 2, 'map1 at 0 is 2')
console.assert(numsBy2[1] === 8, 'map1 at 1 is 8')
console.assert(numsBy2[2] === 18, 'map1 at 2 is 18')
console.assert(numsBy2[3] === 32, 'map1 at 3 is 32')
console.assert(numsBy2.length === nums.length, 'map1 length is 4')

console.info("CASE maps cart items to string with stats")

var cart = [
    { brand: "adidas", name: "cool socks", price: 10, quantity: 2 },
    { brand: "nike", name: "cool air", price: 200, quantity: 1 },
    { brand: "armani", name: "cool glasses", price: 250, quantity: 1 },
    { brand: "calvin klein", name: "cool boxers", price: 30, quantity: 3 }
]

var stats = cart.map(function (element, index, items) {
    var total = 0

})