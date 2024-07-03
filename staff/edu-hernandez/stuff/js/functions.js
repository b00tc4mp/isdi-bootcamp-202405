var fun1 = function () {
    console.log('called ' + arguments.callee.name)
}

console.log(fun1.name)

var fun2 = fun1

console.log(fun2.name)

console.log(fun1())
console.log(fun2())

// sentry-d77148e7.js:5 fun1
// sentry-d77148e7.js:5 fun1
// sentry-d77148e7.js:5 called fun1
// sentry-d77148e7.js:5 called fun1