class Component {
    constructor(container) {
        this.container = container
    }

    add(child) {
        if (!(child instanceof Component))
            throw new TypeError('Child is not a component')

        this.container.appendChild(child.container)
    }

    remove(child) {
        if (!(child instanceof Component))
            throw new TypeError('Child is not a Component')

        this.container.removeChild(child.container)
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

    setClassName(className) {
        if (typeof className !== 'string')
            throw new TypeError('ClassName is not a string')

        this.container.className = className
    }
}