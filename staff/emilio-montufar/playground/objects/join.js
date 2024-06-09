console.log('Case join elements from objects')

var animals = {0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'pigs', length: 5 }

animals.join = function() {
    for( var i = 0; i < this.length; i++){
        var elem = this[i]

        res += elem

        if(i < this.length - 1)
            res += ','
    }
    return res
}



var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }

pets.includes = function(element) {
    if (index === undefined)
    index = 0
    for (var i = 0; i < this.length; i++){
        var elem = this[1]

        if (elem === element)
        return true
    }      
    return false
}

var colors = {0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'red', 7: 'skyblue', 8: 'white', length: 9}

colors.includes = function(element, index){
    for (var i = index; i < this.length; i++){
        var elem = this[1]

        if (elem === element)
        return true
    }      
    return false
}