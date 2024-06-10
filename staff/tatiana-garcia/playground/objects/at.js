console.info('TEST at')

console.info('CASE element at index')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.info(nums)
// [5, 12, 8, 130, 44]
console.info(nums.length)
// 5

nums.at = function (index) {
    //if (index >= 0)
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]
}

var num = nums.at(3)

console.info(num)
// 130

var num = nums.at(0)

console.info(num)
// 5

var num = nums.at(-3)

console.info(num)
// 8

var num = nums.at(100)

console.info(num)
// undefined

var num = nums.at(-100)

console.info(num)
// undefined
