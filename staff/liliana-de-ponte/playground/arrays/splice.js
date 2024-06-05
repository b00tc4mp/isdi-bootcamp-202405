console.log('TEST splice')

console.log('CASE splice in array')

var months = ['Jan', 'March', 'April', 'June'];

months.splice(1, 0, 'Feb');
// Inserts at index 1

console.log(months);
//["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');

console.log(months);
//["Jan", "Feb", "March", "April", "May"]

months.splice(4, 1, 'May');

console.log(months);
//["Jan", "Feb", "March", "April", "May"]

