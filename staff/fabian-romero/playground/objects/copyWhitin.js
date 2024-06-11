console.log('TEST copyWithin in Objects')


console.log('CASE copyWithin')


var letters = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 };

letters.copyWithin = function (target, start, end) {
    if (end === undefined)
        end = this.length

    else if (end < 0)
        end = this.length + end


    if (start === undefined)
        start = 0

    else if (start < 0)
        start = this.length + start

    if (end <= start)
        return this

    if (target === undefined)
        target = 0

    else if (target < 0)
        target = this.length + target

    else if (target > start)
        return this

    var temporal = target;
    for (var i = start; i < end; i++) {
        this[temporal] = this[i]
        temporal++
    }
    return this
}



console.log(letters.copyWithin(0, 3, 4));
//{"d", "b", "c", "d", "e"}

console.log(letters.copyWithin(1, 3));
//{"d", "d", "e", "d", "e"} 