
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
            throw new TypeError('Text is not a string')

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

//____________________________________________________________________________________

class Post {
    constructor(container) {
        this.container = container
    }

    add(child) {
        if (!(child instanceof Post))
            throw new TypeError('Chils is not a Component')

        this.container.appendChild(child.container)
    }

    setClassName(className) {
        if (typeof className !== 'string')
            throw new TypeError('ClassName is not a string')

        this.container.className = className
    }

    setInnerText(innerText) {
        if (typeof innerText !== 'string')
            throw new TypeError('InnerText is not a string')

        this.container.innerText = innerText
    }

    setSRC(src) {
        if (!src.startsWith('http'))
            throw new TypeError('Src not valid')

        this.container.src = src
    }

    setColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('Color is not a string')

        this.container.style.color = color
    }

    setAlt(alt) {
        this.container.alt = alt
    }


}


class PostArticle extends Post {
    constructor() {
        super(document.createElement('article'))


    }
}


class AuthorTitle extends Post {
    constructor() {
        super(document.createElement('h3'))
    }
}


class PostImage extends Post {
    constructor() {
        super(document.createElement('img'))
    }
}


class PostCaption extends Post {
    constructor() {
        super(document.createElement('p'))
    }
}

class PostDateTime extends Post {
    constructor() {
        super(document.createElement('time'))
    }
}

const post = new Post(document.body)


const article = new PostArticle
post.add(article)

const author = new AuthorTitle
author.setInnerText('samu2103')
author.setColor('red')
author.setClassName('author')
article.add(author)

const image = new PostImage
image.setSRC('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQgByBT5IiAT_a2x9pUVb4VMoOrlzHH7Jrzj-HB5jzHlR4lNLMS')
image.setAlt('Image of a dog')
article.add(image)

const caption = new PostCaption
caption.setInnerText('Thursday Mood')
caption.setColor('white')
article.add(caption)

