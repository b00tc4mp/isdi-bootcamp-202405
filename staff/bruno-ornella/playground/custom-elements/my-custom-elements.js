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

