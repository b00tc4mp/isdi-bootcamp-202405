var box1 = document.getElementById('box')

box1.style.backgroundColor = 'red'

var x1 = 100, y1 = 100, STEP = 10

box1.style.left = x1 + 'px'
box1.style.top = y1 + 'px'

document.onkeydown = function (event) {
    console.log(event.key)

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
}
