console.log('TEST shift')

console.log('CASE element at shift')

var names1 = { 0: "Andrew", 1: "Tyrone", 2: "Paul", 3: "Maria", 4: "Gayatri", length: 5 };

console.log(names1)
//{0: "Andrew",1: "Tyrone",2: "Paul",3: "Maria",4: "Gayatri", length: 5}


names1.shift = function () {
    var deletedName = this[0]
    for (var index = 0; index < this.length - 1; index++) {
        this[index] = this[index + 1]
    }
    delete this[this.length - 1]
    this.length--;
    return deletedName
}

var newNames1 = names1.shift()

console.log(newNames1)
//["Andrew"]

console.log(names1)
//{0: "Tyrone",1: "Paul",2: "Maria",3: "Gayatri", length: 4}