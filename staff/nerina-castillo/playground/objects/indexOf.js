console.info("TEST indexOf");

console.info("CASE index of cat from objects");
var cats = {
  0: "Gris",
  1: "Lemmy",
  2: "Ozzy",
  3: "Trici",
  4: "Gris",
  length: 4,
};
console.info(cats);

cats.indexOf = function (cat) {
  for (i = 0; i < this.length; i++) {
    if (this[i] === cat) {
      var index = i;

      return index;
    }
  }
  return -1;
};

var catsIndex = cats.indexOf("Lemmy");

console.info(catsIndex);

console.info("CASE index of a cat from index or from  index");

cats.indexOf = function (element, index) {
  if (index === undefined) index = 0;
  else if (index < 0) {
    index = this.length + index;
    if (index < 0) index = 0;
  }

  for (i = index; i < this.length; i++) {
    if (this[i] === element) {
      var elem = i;

      return elem;
    }
  }
  return -1;
};
var catsIndex = cats.indexOf("Gris", 3);
