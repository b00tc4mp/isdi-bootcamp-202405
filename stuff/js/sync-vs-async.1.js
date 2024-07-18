setTimeout(() => console.log(performance.now(), new Date().toISOString(), 'warmed up'), 1001)
console.log(performance.now(), new Date().toISOString(), 'warm up windows')

setTimeout(() => console.log(performance.now(), new Date().toISOString(), 'at 100'), 1000)
console.log(performance.now(), new Date().toISOString(), 'speed up to 100')

console.log(performance.now(), new Date().toISOString(), 'turn lights on')

let before = Date.now()
while (Date.now() - before < 3000);

console.log(performance.now(), new Date().toISOString(), 'turn lights off')

// VM562: 2 5945028.599999964 '2024-07-18T10:16:05.851Z' 'warm up windows'
// VM562: 5 5945028.899999976 '2024-07-18T10:16:05.851Z' 'speed up to 100'
// VM562: 7 5945029 '2024-07-18T10:16:05.852Z' 'turn lights on'
// VM562: 12 5948029.099999964 '2024-07-18T10:16:08.852Z' 'turn lights off'
// undefined
// VM562: 4 5948030.199999988 '2024-07-18T10:16:08.853Z' 'at 100'
// VM562: 1 5948030.199999988 '2024-07-18T10:16:08.853Z' 'warmed up'

