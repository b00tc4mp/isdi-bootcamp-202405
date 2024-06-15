var actor1 = new Actor(document.getElementById('box-1'), 40, 80)
var actor2 = new Actor(document.getElementById('box-2'), 70, 40)
var actor3 = new Actor(document.getElementById('box-3'), 100, 30)

actor1.setColor('red')
actor2.setColor('dodgerblue')
actor3.setColor('orange')

actor1.setX(120)
actor1.setY(100)

actor2.setX(200)
actor2.setY(200)

actor3.setX(400)
actor3.setY(400)

var STEP = 10

document.onkeydown = function (event) {

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

    if (actor1.x <= actor2.getXMax() && actor1.y <= actor2.getYMax() && actor1.getXMax() >= actor2.x && actor1.getYmax() >= actor2.y)
        console.count('intersecting')
}
