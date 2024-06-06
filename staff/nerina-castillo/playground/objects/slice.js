//TODO implement case for slice
console.log("CASE slice");
var names = {
  0: "Rita",
  1: "Pedro",
  2: "Miguel",
  3: "Ana",
  4: "Vanesa",
  length: 5,
};
console.log(names);

names.slice = function (begining, end) {
  if (begining === undefined) begining = this.length - 1;
  else if (end < 0) end = this.length + end;
  var newNames = { length: 0 };
  for (i = begining; i < end; i++) {
    newNames[i] = this[i];
    newNames.length++;
  }
  return newNames;
};

var male = names.slice(1, 4);

console.log(male);
console.log(male.length);
