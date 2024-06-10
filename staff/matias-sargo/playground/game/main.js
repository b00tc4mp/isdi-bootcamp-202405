var box1 = document.getElementById('box-1')
var box2 = document.getElementById('box-2')

box1.style.backgroundColor = 'red'
box2.style.backgroundColor = 'dodgerblue'

var x1 = 100, y1 = 100, w1 = 50, h1 = 100, x2 = 300, y2 = 300, w2 = 70, h2 = 40, STEP = 10

box1.style.left = x1 + 'px'
box1.style.top = y1 + 'px'
box1.style.width = w1 + 'px'
box1.style.height = h1 + 'px'

box2.style.left = x2 + 'px'
box2.style.top = y2 + 'px'
box2.style.width = w2 + 'px'
box2.style.height = h2 + 'px'

document.onkeydown = function (event) {
    // console.log(event.key)

    if (event.key === 'ArrowRight')
        x1 += STEP
    else if (event.key === 'ArrowLeft')
        x1 -= STEP
    else if (event.key === 'ArrowDown')
        y1 += STEP
    else if (event.key === 'ArrowUp')
        y1 -= STEP

    box1.style.left = x1 + 'px'
    box1.style.top = y1 + 'px'

    if (event.key === 'd')
        x2 += STEP
    else if (event.key === 'a')
        x2 -= STEP
    else if (event.key === 's')
        y2 += STEP
    else if (event.key === 'w')
        y2 -= STEP

    box2.style.left = x2 + 'px'
    box2.style.top = y2 + 'px'


    var x1min = x1
    var y1min = y1

    var x1max = x1 + w1
    var y1max = y1 + h1

    var x2min = x2
    var y2min = y2

    var x2max = x2 + w2
    var y2max = y2 + h2

    // TODO improve intersection detection ( ver con sistema de coordenadas por vertices)

    /*if (x1 <= x2 + w2 && // x2max
        x1 + w1 >= x2 && // x1max
        y1 <= y2 + h2 &&// y2max
        y1 + h1 >= y2) {//y1max
        console.log('intersecting')
    }
}
*/
    if (x1min <= x2max && // x2max
        x1max >= x2min && // x1max
        y1min <= y2max &&// y2max
        y1max >= y2min) {//y1max
        console.log('intersecting')
    }
}

var actor1 = new Actor(document.getElementById('box-1'), 40, 80)
var actor2 = new Actor(document.getElementById('box-2'), 70, 40)

actor1.setColor('red')
actor2.setColor('dodgerblue')

actor1.setX(120)
actor1.setY(100)

actor2.setX(200)
actor2.setY(200)

var STEP = 10

document.onkeydown = function (event) {
    // console.log(event.key)

    if (event.key === 'ArrowRight')
        actor1.moveX(STEP)
    else if (event.key === 'ArrowLeft')
        actor1.moveX(-STEP)
    else if (event.key === 'ArrowDown')
        actor1.moveY(STEP)
    else if (event.key === 'ArrowUp')
        actor1.moveY(-STEP)

    if (event.key === 'd')
        actor2.moveX(STEP)
    else if (event.key === 'a')
        actor2.moveX(-STEP)
    else if (event.key === 's')
        actor2.moveY(STEP)
    else if (event.key === 'w')
        actor2.moveY(-STEP)

    // TODO improve intersection detection

    if (actor1.x <= actor2.getXMax() && actor1.y <= actor2.getYMax() && actor1.getXMax() >= actor2.x && actor1.getYMax() >= actor2.y)
        console.count('intersecting')
}