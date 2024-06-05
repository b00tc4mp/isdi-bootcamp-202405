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

    if (actor1.x <= actor2.getXMax() && actor1.y <= actor2.getYMax() && actor1.getXMax() >= actor2.x && actor1.getYMax() >= actor2.y)
        console.count('intersecting')
};