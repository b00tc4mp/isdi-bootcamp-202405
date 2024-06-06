console.log("TEST includes");

console.log("CASE if an object has an element");

var ramones = { 0: "Yoey", 1: "Deedee", 2: "Johnny", 3: "Marky", length: 4 };

ramones.includes = function (element) {
  for (i = 0; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};

var music = ramones.includes("Deedee");
console.log(music);

console.log("CASE if an object has an element from index");

var ramones = { 0: "Yoey", 1: "Deedee", 2: "Johnny", 3: "Marky", length: 4 };

ramones.includes = function (element, index) {
  if (index === 0) index = 0;
  else if (index < 0) index = this.length + index;

  for (i = index; i < this.length; i++) {
    if (this[i] === element) {
      return true;
    }
  }
  return false;
};

var music = ramones.includes("Johnny", -4);
console.log(music);

var music = ramones.includes("Johnny", -1);
console.log(music);

var music = ramones.includes("Johnny", -15);
console.log(music);
