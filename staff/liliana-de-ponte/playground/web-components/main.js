class Component {
    constructor(container) {
        this.container = container
    }

    add(child) {
        if (!(child instanceof Component))
            throw new TyperError('child is not a Component')
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

//super es palabra clave para acceder
class List extends Component {
    constructor() {
        super(document.createElement('ul'))
    }

    setStyleType(style) {
        this.container.style.listStyleType = style
    }
}

class ListItem extends Component {
    constructor() {
        super(document.createElement('li'))
    }
}

const view = new Component(document.body)
view.setBackgroundColor('black')

const colorList = new List // new List()
colorList.setStyleType('decimal')

const redColorItem = new ListItem
redColorItem.setText('Red')
redColorItem.setColor('tomato')
colorList.add(redColorItem)

const blueColorItem = new ListItem
blueColorItem.setText('Blue')
blueColorItem.setColor('dodgerBlue')
colorList.add(blueColorItem)

const yellowColorItem = new ListItem
yellowColorItem.setText('yellow')
yellowColorItem.setColor('gold')
colorList.add(yellowColorItem)

view.container.appendChild(colorList.container)
