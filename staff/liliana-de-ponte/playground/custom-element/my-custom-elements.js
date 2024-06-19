class HelloWorld extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello, World!'

        this.appendChild(h1)

        h1.style.backgroundColor = 'red'
    }
}

window.customElements.define('hello-world', HelloWorld)

class HelloTo extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello ' + this.innerText + "!"
        this.innerText = ""

        this.appendChild(h1)

        h1.style.backgroundColor = 'cyan'
    }
}

window.customElements.define('hello-to', HelloTo)