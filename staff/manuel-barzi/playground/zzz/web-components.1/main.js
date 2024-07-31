
class Component {
    constructor(container) {
        this.container = container
    }
}

const view = new Component(document.body)
view.container.style.backgroundColor = 'black'

const colorList = new Component(document.createElement('ul'))

const redColorItem = new Component(document.createElement('li'))
redColorItem.container.innerText = 'Red'
redColorItem.container.style.color = 'tomato'
colorList.container.appendChild(redColorItem.container)

const blueColorItem = new Component(document.createElement('li'))
blueColorItem.container.innerText = 'Blue'
blueColorItem.container.style.color = 'dodgerblue'
colorList.container.appendChild(blueColorItem.container)

const yellowColorItem = new Component(document.createElement('li'))
yellowColorItem.container.innerText = 'yellow'
yellowColorItem.container.style.color = 'gold'
colorList.container.appendChild(yellowColorItem.container)

view.container.appendChild(colorList.container)