console.log('TEST slice')

console.log('CASE Method.Slice()')

var metalBands = ['iron maiden', 'metallica', 'stratovarius', 'helloween', 'scorpions']

console.log(metalBands.slice(2))
//['stratovarius', 'helloween', 'scorpions']
console.log(metalBands.slice(1, 3))
// ['metallica', 'stratovarius']
console.log(metalBands.slice(1, -1))
//[ 'metallica', 'stratovarius', 'helloween' ]
console.log(metalBands.slice(-1,))
//['scorpions']