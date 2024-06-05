console.log('TEST splice');

console.log('CASE remove a section of an array');

var months = ['Jan', 'March', 'April', 'June'];

console.log(months.splice(1, 0, 'Feb'));
//[]
console.log(months);
//["Jan", "Feb", "March", "April", "June"]

console.log(months.splice(4, 1, 'May'));
//['June']
console.log(months);
//["Jan", "Feb", "March", "April", "May"]