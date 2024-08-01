class HelloWorld extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello, World'

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
        /*const h1 = document.createElement('h1')
        
        h1.innerText = 'Hello, ' + this.innerText + '!'
        this.innerText = ''
        
        this.appendChild(h1)*/

        this.innerText = 'Hello, ' + this.innerText + '!'


    }

}

window.customElements.define('hello-to', HelloTo)

class HelloTo2 extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        const name = this.getAttribute('name')

        h1.innerText = `Hello, ${name}!`

        this.appendChild(h1)
    }

}

window.customElements.define('hello-to2', HelloTo2)

class CoolClock extends HTMLElement {
    constructor() {
        console.info('CoolClock -> constructor')

        super()
    }

    connectedCallback() {
        console.log('CoolClock -> connectedCallback')

        this.style.fontFamily = 'Monaco'
        this.style.fontSize = '24px'
        this.style.display = 'block'

        const self = this

        setInterval(function () {
            //self.innerText = new Date().toISOString()

            const now = new Date().toLocaleTimeString()

            self.innerText = now

            const alarm = self.getAttribute('alarm')

            if (now >= alarm)
                self.style.backgroundColor = 'red'
        }, 1000)
    }
}

window.customElements.define('cool-clock', CoolClock)