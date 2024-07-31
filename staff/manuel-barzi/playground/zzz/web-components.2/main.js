
class Component {
    constructor(container) {
        this.container = container
    }

    add(child) {
        if (!(child instanceof Component))
            throw new TypeError('child is not a Component')

        this.container.appendChild(child.container)
    }

    setText(text) {
        if (typeof text !== 'string')
            throw new TypeError('text is not a string')

        this.container.innerText = text
    }

    setBackgroundColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('color is not a string')

        this.container.style.backgroundColor = color
    }

    setColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('color is not a string')

        this.container.style.color = color
    }
}

const view = new Component(document.body)
view.setBackgroundColor('black')

const colorList = new Component(document.createElement('ul'))

const redColorItem = new Component(document.createElement('li'))
redColorItem.setText('Red')
redColorItem.setColor('tomato')
colorList.add(redColorItem)

const blueColorItem = new Component(document.createElement('li'))
blueColorItem.setText('Blue')
blueColorItem.setColor('dodgerblue')
colorList.add(blueColorItem)

const yellowColorItem = new Component(document.createElement('li'))
yellowColorItem.setText('yellow')
yellowColorItem.setColor('gold')
colorList.add(yellowColorItem)

view.add(colorList)