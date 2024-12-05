const Curray = require('./Curray')

console.info('TEST flat')

console.info('CASE flats 1 level')

{
    const nums0 = new Curray(100, 110)
    const nums1 = new Curray(60, 70, 90, nums0)
    const nums2 = new Curray(40, 50, nums1)
    const nums = new Curray(10, 20, 30, nums2)

    console.assert(nums[0] === 10, 'nums at 0 is 10')
    console.assert(nums[1] === 20, 'nums at 1 is 20')
    console.assert(nums[2] === 30, 'nums at 2 is 30')
    console.assert(nums[3] === nums2, 'nums at 3 is nums2')

    const flatted = nums.flat()

    /*
    const nums0 = new Curray(100, 110)
    const nums1 = new Curray(60, 70, 90, nums0)
    const flatted = new Curray(10, 20, 30, 40, 50, nums1)
    */

    console.assert(flatted[0] === 10, 'flatted at 0 is 10')
    console.assert(flatted[1] === 20, 'flatted at 1 is 20')
    console.assert(flatted[2] === 30, 'flatted at 2 is 30')
    console.assert(flatted[3] === 40, 'flatted at 3 is 40')
    console.assert(flatted[4] === 50, 'flatted at 4 is 50')
    console.assert(flatted[5] === nums1, 'flatted at 5 is nums1')
}

console.info('CASE flats 2 levels')

{
    const nums0 = new Curray(100, 110)
    const nums1 = new Curray(60, 70, 90, nums0)
    const nums2 = new Curray(40, 50, nums1)
    const nums = new Curray(10, 20, 30, nums2)

    console.assert(nums[0] === 10, 'nums at 0 is 10')
    console.assert(nums[1] === 20, 'nums at 1 is 20')
    console.assert(nums[2] === 30, 'nums at 2 is 30')
    console.assert(nums[3] === nums2, 'nums at 3 is nums2')

    const flatted = nums.flat(2)

    /*
    const nums0 = new Curray(100, 110)
    const flatted = new Curray(10, 20, 30, 40, 50, 60, 70, 90, nums0)
    */

    console.assert(flatted[0] === 10, 'flatted at 0 is 10')
    console.assert(flatted[1] === 20, 'flatted at 1 is 20')
    console.assert(flatted[2] === 30, 'flatted at 2 is 30')
    console.assert(flatted[3] === 40, 'flatted at 3 is 40')
    console.assert(flatted[4] === 50, 'flatted at 4 is 50')
    console.assert(flatted[5] === 60, 'flatted at 5 is 60')
    console.assert(flatted[6] === 70, 'flatted at 6 is 70')
    console.assert(flatted[7] === 90, 'flatted at 7 is 90')
    console.assert(flatted[8] === nums0, 'flatted at 8 is nums0')
}

console.info('CASE flats 3 levels')

{
    const nums0 = new Curray(100, 110)
    const nums1 = new Curray(60, 70, 90, nums0)
    const nums2 = new Curray(40, 50, nums1)
    const nums = new Curray(10, 20, 30, nums2)

    console.assert(nums[0] === 10, 'nums at 0 is 10')
    console.assert(nums[1] === 20, 'nums at 1 is 20')
    console.assert(nums[2] === 30, 'nums at 2 is 30')
    console.assert(nums[3] === nums2, 'nums at 3 is nums2')

    const flatted = nums.flat(3)

    /*
    const flatted = new Curray(10, 20, 30, 40, 50, 60, 70, 90, 100, 110)
    */

    console.assert(flatted[0] === 10, 'flatted at 0 is 10')
    console.assert(flatted[1] === 20, 'flatted at 1 is 20')
    console.assert(flatted[2] === 30, 'flatted at 2 is 30')
    console.assert(flatted[3] === 40, 'flatted at 3 is 40')
    console.assert(flatted[4] === 50, 'flatted at 4 is 50')
    console.assert(flatted[5] === 60, 'flatted at 5 is 60')
    console.assert(flatted[6] === 70, 'flatted at 6 is 70')
    console.assert(flatted[7] === 90, 'flatted at 7 is 90')
    console.assert(flatted[8] === 100, 'flatted at 8 is 100')
    console.assert(flatted[9] === 110, 'flatted at 9 is 110')
}

console.info('CASE flats all levels (with infinity)')

{
    const nums0 = new Curray(100, 110)
    const nums1 = new Curray(60, 70, 90, nums0)
    const nums2 = new Curray(40, 50, nums1)
    const nums = new Curray(10, 20, 30, nums2)

    console.assert(nums[0] === 10, 'nums at 0 is 10')
    console.assert(nums[1] === 20, 'nums at 1 is 20')
    console.assert(nums[2] === 30, 'nums at 2 is 30')
    console.assert(nums[3] === nums2, 'nums at 3 is nums2')

    const flatted = nums.flat(Infinity)

    /*
    const flatted = new Curray(10, 20, 30, 40, 50, 60, 70, 90, 100, 110)
    */

    console.assert(flatted[0] === 10, 'flatted at 0 is 10')
    console.assert(flatted[1] === 20, 'flatted at 1 is 20')
    console.assert(flatted[2] === 30, 'flatted at 2 is 30')
    console.assert(flatted[3] === 40, 'flatted at 3 is 40')
    console.assert(flatted[4] === 50, 'flatted at 4 is 50')
    console.assert(flatted[5] === 60, 'flatted at 5 is 60')
    console.assert(flatted[6] === 70, 'flatted at 6 is 70')
    console.assert(flatted[7] === 90, 'flatted at 7 is 90')
    console.assert(flatted[8] === 100, 'flatted at 8 is 100')
    console.assert(flatted[9] === 110, 'flatted at 9 is 110')
}

console.info('CASE flats 4 levels')

{
    const nums0 = new Curray(100, 110)
    const nums1 = new Curray(60, 70, 90, nums0)
    const nums2 = new Curray(40, 50, nums1)
    const nums3 = new Curray(10, 20, 30, nums2)
    const nums = new Curray(nums3, 120, 130)

    console.assert(nums[0] === nums3, 'nums at 0 is nums3')
    console.assert(nums[1] === 120, 'nums at 1 is 120')
    console.assert(nums[2] === 130, 'nums at 2 is 130')

    const flatted = nums.flat(4)

    /*
    const flatted = new Curray(10, 20, 30, 40, 50, 60, 70, 90, 100, 110, 120, 130)
    */

    console.assert(flatted[0] === 10, 'flatted at 0 is 10')
    console.assert(flatted[1] === 20, 'flatted at 1 is 20')
    console.assert(flatted[2] === 30, 'flatted at 2 is 30')
    console.assert(flatted[3] === 40, 'flatted at 3 is 40')
    console.assert(flatted[4] === 50, 'flatted at 4 is 50')
    console.assert(flatted[5] === 60, 'flatted at 5 is 60')
    console.assert(flatted[6] === 70, 'flatted at 6 is 70')
    console.assert(flatted[7] === 90, 'flatted at 7 is 90')
    console.assert(flatted[8] === 100, 'flatted at 8 is 100')
    console.assert(flatted[9] === 110, 'flatted at 9 is 110')
    console.assert(flatted[10] === 120, 'flatted at 10 is 120')
    console.assert(flatted[11] === 130, 'flatted at 11 is 130')
}