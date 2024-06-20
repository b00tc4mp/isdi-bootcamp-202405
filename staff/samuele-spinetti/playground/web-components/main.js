
class Component {
    constructor(container) {
        this.container = container
    }

    add(child) {
        if (!(child instanceof Component))
            throw new TypeError('Child is not a Component')

        this.container.appendChild(child.container)
    }

    setText(text) {
        if (typeof text !== 'string')
            throw new TypeError('Textis not a string')

        this.container.innerText = text
    }

    setBackgroundColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('Color is not a string')

        this.container.style.backgroundColor = color
    }

    setColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('Color is not a string')

        this.container.style.color = color
    }
}

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
blueColorItem.setColor('dodgerblue')
colorList.add(blueColorItem)

const yellowColorItem = new ListItem
yellowColorItem.setText('Yellow')
yellowColorItem.setColor('gold')
colorList.add(yellowColorItem)

view.add(colorList)