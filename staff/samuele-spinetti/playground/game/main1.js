var box1 = document.getElementById('box-1')
var box2 = document.getElementById('box-2')

box1.style.backgroundColor = 'red'
box2.style.backgroundColor = 'dodgreblue'

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


