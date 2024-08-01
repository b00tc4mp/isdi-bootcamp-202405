console.info("TEST splice");

console.info("CASE insert feb in months");

var months = ["Jan", "March", "April", "June"];

var res = months.splice(1, 0, "Feb");

console.assert(res.length === 0, "res length is 0");
console.assert(months.length === 5, "months length is 5");
console.assert(months[0] === "Jan", "months at 0 is Jan");
console.assert(months[1] === "Feb", "months at 1 is Feb");
console.assert(months[2] === "Mar", "months at 2 is Mar");
console.assert(months[3] === "Apr", "months at 3 is Apr");
console.assert(months[4] === "June", "months at 4 is June");

months.splice(4, 1, "May");

console.info("CASE replace element with other element in months");

var months = new Array[("Jan", "Mar", "Aprr", "Jun")]();

var res = months.splice(1, 1, "Mar");

console.assert(res.length === 1, "res length is 1");
console.assert(res[0] === "res at 0 is Aprr");

console.assert(months.length === 5, "months length is 5");
console.assert(months[0] === "Jan", "months at 0 is Jan");
console.assert(months[1] === "Feb", "months at 1 is Feb");
console.assert(months[2] === "Mar", "months at 2 is Mar");
console.assert(months[3] === "Apr", "months at 3 is Apr");
console.assert(months[4] === "June", "months at 4 is June");
