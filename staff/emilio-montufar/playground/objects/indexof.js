console.log('CASE indexOf to search position in objects')

var animals = {1: 'pigs', 2: 'goats', 3: 'sheep', 4: 'cows', 5: 'pigs', length: 6}

animals.indexOf = function(element){
 //    var elem = this[0]
 //    if (elem === element)
 //       return 0
 //    var elem = this[1]
 //    if (elem === element)
 //        return 1
 //    var elem = this[2]
 //    if (elem === element)
 //        return 2
 //    var elem = this[3]
 //    if (elem === element)
 //        return 3
 //   var elem = this[4]
 //    if (elem === element)
 //        return 4

    for (var i = 0; i < this.length; i++) {
    if (index === undifined)
        index = 0
    else if (index < 0) {
        index = this.length + index

            if (index <0)
                index = 0
    }
    var elem = this[i]

        if (elem === element)
            return i
    }

    return -1
}
var index = animals.indexOf('pigs')

var index = animals.indexOf('elephant')

var index =
