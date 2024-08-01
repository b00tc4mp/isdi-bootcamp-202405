new Promise((resolve, reject) => {
    // setTimeout(() =>  resolve(123), 1000)
    setTimeout(() => reject(123), 1000)
})
    //.then(value => console.log(value), error => console.error(error))
    .then(value => console.log(value))
    //.catch(error => console.error(error))
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(456), 1000)
        })
    })
    .then(value => console.log(value))
    .catch(error => {
        console.error(error)

        //return 789
        throw new Error('012')
    })
    //.then(value => console.log(value), error => console.error(error))
    .then(value => console.log(value))
    .catch(error => console.error(error))
    .then(() => {
        console.log(678)

        throw new Error('901')
    })

// console.log(345)
// VM1316:29 345
// undefined
// 563-10c5b65a2ff77937.js:1 123
// window.console.error @ 563-10c5b65a2ff77937.js:1
// overrideMethod @ console.js:288
// (anonymous) @ VM1316:15
// Promise.catch
// (anonymous) @ VM1316:14
// Show 1 more frame
// Show less
// 563-10c5b65a2ff77937.js:1 Error: 012
//     at <anonymous>:18:15
// window.console.error @ 563-10c5b65a2ff77937.js:1
// overrideMethod @ console.js:288
// (anonymous) @ VM1316:22
// Promise.catch
// (anonymous) @ VM1316:22
// Show 1 more frame
// Show less
// VM1316:24 678
// VM1316:26 Uncaught (in promise) Error: 901
//     at <anonymous>:26:15