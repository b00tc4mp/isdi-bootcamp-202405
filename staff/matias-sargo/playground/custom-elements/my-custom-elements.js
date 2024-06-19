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
        super();
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        const name = this.getAttribute('name')

        h1.innerText = `Hello to ${name}!`

        this.appendChild(h1);


        h1.style.backgroundImage = 'url("https://st2.depositphotos.com/2124221/46809/i/450/depositphotos_468095768-stock-photo-abstract-multicolored-background-poly-pattern.jpg")'
        h1.style.backgroundSize = 'cover'; // Para asegurarse de que la imagen cubra todo el elemento
        h1.style.color = 'grey'; // Cambiar el color del texto para que sea visible
        h1.style.padding = '20px';
    }
}

window.customElements.define('hello-to', HelloTo)
