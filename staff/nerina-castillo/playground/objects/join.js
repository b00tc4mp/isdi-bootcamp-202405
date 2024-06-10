console.info("TEST join");

console.info("CASE join elements in a string");

const elements = { 0: "Fire", 1: "Air", 2: "Water", length: 3 };

elements.join = function () {
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      //esto es para que al llegar al último elemento no ponga ',' pero en el resto sí
      count += ",";
    }
  }
  return joined;
};

var joinedElements = elements.join();

console.info(joinedElements);

console.info("CASE join elements with separator");

var things = {
  0: true,
  1: "hello world",
  2: 100,
  3: { name: "Oswald" },
  4: [10, 20, 30],
  5: function () {},
  length: 6,
};

things.join = function (separator) {
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      //esto es para que al llegar al último elemento no ponga ' $ ' pero en el resto sí
      count += separator;
    }
  }
  return joined;
};
var joined = things.join(" $ ");

console.info(joined);

console.info("CASE join elements without separator");

var things = {
  0: true,
  1: "hello world",
  2: 100,
  3: { name: "Oswald" },
  4: [10, 20, 30],
  5: function () {},
  length: 6,
};

things.join = function (separator) {
  if (separator === undefined) {
    separator = ","; //esto es para que si no hay separador devuelva el join con  ','
  }
  var joined = "";
  for (i = 0; i < this.length; i++) {
    var count = this[i];
    joined += count;
    if (i === this.length - 1) {
      count += separator;
    }
  }
  return joined;
};
var joined = things.join();

console.info(joined);

var joined = things.join(undefined);

console.info(joined);

var joined = things.join("");

console.info(joined);
