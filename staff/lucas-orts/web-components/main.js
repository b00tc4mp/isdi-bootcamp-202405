class Component {
    constructor(container) {
        this.container = container
    }
    add(child) {
        if (!(child instanceof Component))
            throw new TypeError('child is not a Component')

        this.container.appenChild(child.container)
    }

    setText(text) {
        if (typeof text !== 'string')
            throw new TypeError('text is not a string')

        this.container.innerText = text
    }

    setBackgroundColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('color is not a string')

        this.container.style.setBackgroundColor = color
    }

    setColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('color is not a string')

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

const colorList = new List //new List()
colorList.setStyleType('decimal')

const redColorItem = new ListItem
redColorItem.setText('Red')
redColorItem.setColor('tomato')
colorList.add(redColorItem)

const blueColorItem = new ListItem
blueColorItem.setText('Blue')
blueColorItem.setColor('dogerblue')
colorList.add(blueColorItem)

const yellowColorItem = new ListItem
yellowColorItem.setText('Yellow')
yellowColorItem.setColor('gold')

view.add(colorList)