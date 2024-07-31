function fun() { throw new Error('hola error') }

//fun()

/**/
try {
    //fun()
    setTimeout(() => fun(), 0)
} catch (error) {
    console.error(error.message)
} finally {
    console.log('try-catch passed')
}
/**/

// VM377: 12 try-catch passed
// 43
// VM377:1 Uncaught Error: hola error
//     at fun (<anonymous>:1:24)
//     at <anonymous>:8:22