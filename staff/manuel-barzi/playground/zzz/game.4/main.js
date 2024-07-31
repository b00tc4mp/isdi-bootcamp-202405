var actor1 = {}, actor2 = {}

actor1.container = document.getElementById('box-1')
actor2.container = document.getElementById('box-2')

actor1.container.style.backgroundColor = 'red'
actor2.container.style.backgroundColor = 'dodgerblue'

actor1.x = 120
actor1.y = 100
actor1.w = 40
actor1.h = 80

actor2.x = 200
actor2.y = 200
actor2.w = 70
actor2.h = 40

var STEP = 10

actor1.container.style.left = actor1.x + 'px'
actor1.container.style.top = actor1.y + 'px'
actor1.container.style.width = actor1.w + 'px'
actor1.container.style.height = actor1.h + 'px'

actor2.container.style.left = actor2.x + 'px'
actor2.container.style.top = actor2.y + 'px'
actor2.container.style.width = actor2.w + 'px'
actor2.container.style.height = actor2.h + 'px'

document.onkeydown = function (event) {
    // console.log(event.key)

    if (event.key === 'ArrowRight')
        actor1.x += STEP
    else if (event.key === 'ArrowLeft')
        actor1.x -= STEP
    else if (event.key === 'ArrowDown')
        actor1.y += STEP
    else if (event.key === 'ArrowUp')
        actor1.y -= STEP

    actor1.container.style.left = actor1.x + 'px'
    actor1.container.style.top = actor1.y + 'px'

    if (event.key === 'd')
        actor2.x += STEP
    else if (event.key === 'a')
        actor2.x -= STEP
    else if (event.key === 's')
        actor2.y += STEP
    else if (event.key === 'w')
        actor2.y -= STEP

    actor2.container.style.left = actor2.x + 'px'
    actor2.container.style.top = actor2.y + 'px'

    // TODO improve intersection detection

    actor1.xmin = actor1.x
    actor1.ymin = actor1.y

    actor1.xmax = actor1.x + actor1.w
    actor1.ymax = actor1.y + actor1.h

    actor2.xmin = actor2.x
    actor2.ymin = actor2.y

    actor2.xmax = actor2.x + actor2.w
    actor2.ymax = actor2.y + actor2.h

    if (actor1.xmin <= actor2.xmax && actor1.ymin <= actor2.ymax && actor1.xmax >= actor2.xmin && actor1.ymax >= actor2.ymin)
        console.count('intersecting')
}
