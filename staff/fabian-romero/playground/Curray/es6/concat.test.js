var Curray = require('./Curray')

console.info('TEST Curray.prototype.concat')

console.info('CASE concat elements from two Currays')

{

    const chars1 = new Curray('a', 'b', 'c')
    const chars2 = new Curray('d', 'e', 'f')

    const chars3 = chars1.concat(chars2)

    console.assert(chars1[0] === 'a', 'chars1 at 0 is a')
    console.assert(chars1[1] === 'b', 'chars1 at 1 is b')
    console.assert(chars1[2] === 'c', 'chars1 at 2 is c')
    console.assert(chars1.length === 3, 'chars1 length is 3')
    console.assert(chars2[0] === 'd', 'chars1 at 0 is d')
    console.assert(chars2[1] === 'e', 'chars1 at 1 is e')
    console.assert(chars2[2] === 'f', 'chars1 at 2 is f')
    console.assert(chars2.length === 3, 'chars2 length is 3')
    console.assert(chars3.length === 6, 'chars3 length is 6')

}


console.info('CASE concat elements from 5 Currays')

{

    const nums1 = new Curray(10, 20, 30)
    const nums2 = new Curray(400, 500)
    const nums3 = new Curray(-60, -70)
    const nums4 = new Curray(800, 900)
    const nums5 = new Curray()
    nums5[0] = -1000
    nums5.length++

    const nums6 = nums1.concat(nums2, nums3, nums4, nums5)

    console.assert(nums1[0] === 10, 'nums1 at 0 is 10')
    console.assert(nums1[1] === 20, 'nums1 at 1 is 20')
    console.assert(nums1[2] === 30, 'nums1 at 2 is 30')
    console.assert(nums2[0] === 400, 'nums2 at 0 is 400')
    console.assert(nums2[1] === 500, 'nums2 at 1 is 500')
    console.assert(nums3[0] === -60, 'nums3 at 0 is -60')
    console.assert(nums3[1] === -70, 'nums3 at 0 is -70')
    console.assert(nums4[0] === 800, 'nums4 at 0 is 800')
    console.assert(nums4[1] === 900, 'nums4 at 0 is 900')
    console.assert(nums5[0] === -1000, 'nums5 at 0 is -1000')
    console.assert(nums6.length === 10, 'nums6 length is 10')

}