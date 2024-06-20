class BackgroundFader extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.className = 'fader';
    }
}

window.customElements.define('background-fader', BackgroundFader)