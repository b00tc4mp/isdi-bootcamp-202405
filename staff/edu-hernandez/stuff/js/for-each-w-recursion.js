/*
var nums = [10, 20, 30, 40, 50]

for (var i = 0; i < nums.length; i++) {
    var num = nums[i]

    console.log(num)
}
*/

/*
var nums = [10, 20, 30, 40, 50]

var i = 0

while(i < nums.length) {
    var num = nums[i++]

    console.log(num)
}
*/

/*
var nums = [10, 20, 30, 40, 50]

nums.forEach(function(num) {
    console.log(num)
})
*/

/*
var nums = [10, 20, 30, 40, 50]

var i = 0

if (i < nums.length) {
    var num = nums[i++]

    console.log(num)

    if (i < nums.length) {
        var num = nums[i++]
    
        console.log(num)
    
        if (i < nums.length) {
            var num = nums[i++]
        
            console.log(num)
        
            if (i < nums.length) {
                var num = nums[i++]
            
                console.log(num)
            
                if (i < nums.length) {
                    var num = nums[i++]
                
                    console.log(num)
                
                    
                }
            }
        }
    }
}
*/

/*
var nums = [10, 20, 30, 40, 50]

var i = 0

function pepito() {
    if (i < nums.length) {
        var num = nums[i++]

        console.log(num)

        pepito()
    }
}

pepito()
*/

var nums = [10, 20, 30, 40, 50]


function forEach(array, callback) {
    var i = 0

    function loop() {
        if (i < nums.length) {
            var num = nums[i++]

            callback(num)

            loop()
        }
    }

    loop()
}

forEach(nums, function (num) {
    console.log(num)
})
// VM645: 21 10
// VM645: 21 20
// VM645: 21 30
// VM645: 21 40
// VM645: 21 50

/*
call stack

forEach(...)
forEach(...) -> loop()
forEach(...) -> loop() -> callback()
forEach(...) -> loop() -> loop()
forEach(...) -> loop() -> loop() -> callback()
forEach(...) -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop() -> loop() -> callback()
forEach(...) -> loop() -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop() -> loop() -> loop() -> callback()
forEach(...) -> loop() -> loop() -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop() -> loop() -> loop() -> loop() -> callback()
forEach(...) -> loop() -> loop() -> loop() -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop() -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop() -> loop()
forEach(...) -> loop() -> loop()
forEach(...) -> loop()
forEach(...)
*/