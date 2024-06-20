class HelloWorld extends HTMLElement {
    constructor() {
        console.info('HelloWorld -> constructor')

        super()
    }

    connectedCallback() {
        console.log('HelloWorld -> connectedCallback')
        // const h1 = document.createElement('h1')
        // h1.innerText = 'Hello, World!'
        // h1.style.backgroundColor = 'red'
        // this.appendChild(h1)

        // this.innerText = 'Hello, World!'
        this.style.fontFamily = 'Monaco'
        this.style.fontSize = '24px'
        this.style.display = 'block'

        const self = this

        setTimeout(function () {
            self.innerText = self.innerText ? 'Hello, ' + self.innerText + '!' : 'Hello, World!'
        }, 0)

    }
}

window.customElements.define('hello-world', HelloWorld)

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


