var box1 = document.getElementById('box-1')
var box2 = document.getElementById('box-2')

box1.style.backgroundColor = 'red'
box2.style.backgroundColor = 'dodgerblue'

var x1 = 120, y1 = 100, w1 = 20, h1 = 10, x2 = 200, y2 = 200, w2 = 70, h2 = 40, STEP = 10

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

    // TODO improve intersection detection

    var x1min = x1
    var y1min = y1

    var x1max = x1 + w1
    var y1max = y1 + h1

    var x2min = x2
    var y2min = y2

    var x2max = x2 + w2
    var y2max = y2 + h2

    if (x1min <= x2max && y1min <= y2max && x1max >= x2min && y1max >= y2min)
        console.count('intersecting')
}
