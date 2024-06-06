console.log("TEST splice");

console.log("CASE insert Feb in months");

var months = { 0: "Jan", 1: "March", 2: "April", 3: "June", length: 4 };

months.splice = function (start, removeCount, element) {
  //   this[this.length++] = this[3];
  //   this[3] = this[2];
  //   this[2] = this[1];

  for (var i = this.length; i > start; i--) {
    this[i] = this[i - 1];
  }
  this.length++;

  this[start] = element;

  return { length: 0 };
};

var res = months.splice(1, 0, "Feb");

console.log("CASE replace element with other element in months");
console.log("CASE replace element with other element in months");

var months = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Aprr", 4: "Jun" };

var res = months.splice(1, 1, "Mar");

console.assert(res.length === 1, "res length is 1");
console.assert(res[0] === "res at 0 is Aprr");

console.assert(months.length === 5, "months length is 5");
console.assert(months[0] === "Jan", "months at 0 is Jan");
console.assert(months[1] === "Feb", "months at 1 is Feb");
console.assert(months[2] === "Mar", "months at 2 is Mar");
console.assert(months[3] === "Apr", "months at 3 is Apr");
console.assert(months[4] === "June", "months at 4 is June");

var res = months.splice(3, 1, "Apr");

months.splice = function (start, removeCount, element) {
  var removed = { length: 0 };

  removed[removed.length++] = this[start];

  this[start] = element;

  return removed;
};

//   var newObject = { length: 0 };
//   if (start < 0) {
//     start = this.length + start;
//   }
//   if (start < 0) {
//     start = 0;
//   } else if (start >= this.length) {
//     start = this.length;
//   } else if (start === undefined) {
//     start = 0;
//     return newObject;
//   }
//   if (deleteItem === undefined) {
//     deleteItem = 0;
//   } else if (deleteItem <= 0) {
//     deleteItem = 0;
//   }

//   for (var i = start; i < deleteItem; i++) {
//     newObject[newObject.length++] = this[start];
//     for (var j = start; j < this.length; j++) {
//       this[j] = this[j + 1];
//     }
//     delete this[this.length - 1];
//     this.length--;
//   }
//   for (var i = start; i < start + args.length; i++) {
//     for (var j = this.length; j > start; j--) {
//       this[j] = this[j - 1];
//     }
//     this.length++;
//     this[i + start] = args[i];
//   }
//return newObject;
//};

var res = months.splice(1, 0, "Feb");

console.assert(res.length === 0, "res length is 0");
console.assert(months.length === 5, "months length is 5");
console.assert(months[0] === "Jan", "months at 0 is Jan");
console.assert(months[1] === "Feb", "months at 1 is Feb");
console.assert(months[2] === "Mar", "months at 2 is Mar");
console.assert(months[3] === "Apr", "months at 3 is Apr");
console.assert(months[4] === "June", "months at 4 is June");

console.log(months);

months.splice(4, 1, "May");

console.log(months);
