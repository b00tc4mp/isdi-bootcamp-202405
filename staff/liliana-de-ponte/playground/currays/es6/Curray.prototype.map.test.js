const Curray = require('./Curray')

console.info('TEST map')

console.info('CASE map numbers to each one multiplied by 2')

const nums = new Curray(1, 4, 9, 16)

const numsBy2 = nums.map(function (num) { return num * 2 })

console.assert(numsBy2 instanceof Curray, 'numsBy2 is an Curray')
console.assert(numsBy2.length === nums.length, 'numsBy2 length equals nums length')
console.assert(numsBy2[0] === 2, 'numsBy2 at 0 is 2')
console.assert(numsBy2[1] === 8, 'numsBy2 at 1 is 8')
console.assert(numsBy2[2] === 18, 'numsBy2 at 2 is 18')
console.assert(numsBy2[3] === 32, 'numsBy2 at 3 is 32')

console.info('CASE maps cart items to string with stats')

const cart = new Curray(
    { brand: 'adidas', name: 'cool socks', price: 10, quantity: 2 },
    { brand: 'nike', name: 'cool air', price: 200, quantity: 1 },
    { brand: 'armani', name: 'cool glasses', price: 250, quantity: 1 },
    { brand: 'calvin klein', name: 'cool boxers', price: 30, quantity: 3 },
)

const stats = cart.map(function (element, index, items) {
    let total = 0

    for (let i = 0; i < items.length; i++) {
        let item = items[i]

        total += item.price * item.quantity
    }

    const stat = element.name + ' (' + element.brand + ') ' + (element.price * element.quantity) + '€ (' + (element.price * element.quantity) / total * 100 + '%)'

    return stat
})

console.assert(stats instanceof Curray, 'stats is an Curray')
console.assert(stats.length === cart.length, 'stats length is equal to cart length')
console.assert(stats[0] === 'cool socks (adidas) 20€ (3.571428571428571%)', 'stats at 0 is a string with adidas stats')
console.assert(stats[1] === 'cool air (nike) 200€ (35.714285714285715%)', 'stats at 1 is a string with nike stats')
console.assert(stats[2] === 'cool glasses (armani) 250€ (44.642857142857146%)', 'stats at 2 is a string with armani stats')
console.assert(stats[3] === 'cool boxers (calvin klein) 90€ (16.071428571428573%)', 'stats at 3 is a string with calvin klein stats')