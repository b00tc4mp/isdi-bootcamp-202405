function f1() {
    debugger
    var v1 = 0

    function f2() {
        debugger
        return ++v1
    }

    return f2
}

var f = f1()

var v = f()

console.log(v)

v = f()

console.log(v)

v = f()

console.log(v)


// VM168: 17 1
// VM168: 21 2
// VM168: 25 3