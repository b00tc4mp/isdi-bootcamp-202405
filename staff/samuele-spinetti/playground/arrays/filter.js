console.log('TEST FILTER')

console.log('CASE filter in array')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = words.filter((word) => word.length > 6)

console.log(result)
//["exuberant", "destruction", "present"]