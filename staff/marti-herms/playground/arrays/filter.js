console.log('TEST filter');

console.log('CASE test 1');

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter((word) => word.length > 6);

console.log(result);
//["exuberant", "destruction", "present"]