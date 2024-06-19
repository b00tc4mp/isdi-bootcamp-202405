const Curray = require('./Curray')

console.info('TEST Array.prototype.concat')

console.info('CASE concat elements from two arrays')

const chars1 = new Curray('a', 'b', 'c')
const chars2 = new Curray('d', 'e', 'f')

const chars3 = chars1.concat(chars2)
const chars33 = ['a', 'b', 'c', 'd', 'e', 'f']

console.assert(chars1.length === 3, 'chasr1 length is 3')
console.assert(chars2.length === 3, 'chasr2 length is 3')
console.assert(chars3.length === 6, 'chasr3 length is 6')
console.assert(chars3[3] === 'd', 'chars3 at 3 is equal to d')

console.log('CASE concat elements from 5 arrays')

const nums1 = new Curray(10, 20, 30)
const nums2 = new Curray(400, 500)
const nums3 = new Curray(-60, -70)
const nums4 = new Curray(800, 900)
const nums5 = new Curray()
nums5[0] = -1000
nums5.length++

const nums6 = nums1.concat(nums2, nums3, nums4, nums5)
//var nums66 = [10, 20, 30, 400, 500, -60, -70, 800, 900, -1000]

console.assert(nums6[3] === 400, 'nums6 at 3 is 400')
console.assert(nums6[5] === -60, 'nums5 at 3 is -60')
console.assert(nums6[7] === 800, 'nums6 at 7 is 800')
console.assert(nums6[9] === -1000, 'nums6 at 9 is -1000')
console.assert(nums6.length === 10, 'nums6 length is 10')





