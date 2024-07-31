function getCatData(cat) {
    return "Name: ".concat(cat.name, ", age: ").concat(cat.age, ", color: ").concat(cat.color, ", meow: ").concat(cat.meow);
}
var cat = {
    name: 'Lemmy',
    age: 11,
    color: 'brown',
    meow: true
};
console.log(getCatData(cat));
