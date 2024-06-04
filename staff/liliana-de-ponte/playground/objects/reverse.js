console.log('TEST reverse')

console.log('CASE element at Reverse')

var nums = { 0: 'one', 1: 'two', 2: 'three', length: 3 };

console.log(nums)
//{0:'one', 1:'two',2: 'three', length: 3}

console.log(nums.length)
//3

//funciona pero no se detiene verlo por --inspect
nums.reverse = function () {
    var tmp;
    for (var i = 0; i < this.length - i; i++) {
        tmp = this[i]
        this[i] = this[this.length - i - 1];
        this[this.length - i - 1] = tmp;
    }
    return this
}

var numsReverse = nums.reverse()

console.log(numsReverse)
//{0: 'three', 1: 'two', 2: 'one'}

console.log(nums)
//[0: 'three',1: 'two',2: 'one']
