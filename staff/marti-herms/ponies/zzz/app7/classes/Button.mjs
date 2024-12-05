import Component from './Component.mjs'

class Button extends Component {
    constructor(id = '') {
        super(document.createElement('button'));
        if (id.length !== 0) {
            this.setId(id);
        }
    }

    onClick(callback) {
        this.container.onclick = callback;
    }

    setColor(color) {
        this.container.style.backgroundColor = color;
    }

    setHeartWhite() {
        if (this.container.className !== 'like-button') {
            throw new Error('this button is not the like button');
        }
        this.container.style.borderImage = 'radial-gradient(white 69%, #0000 70%) 84.5%/50%';
    }

    setHeartRed() {
        if (this.container.className !== 'like-button') {
            throw new Error('this button is not the like button');
        }
        this.container.style.borderImage = 'radial-gradient(red 69%, #0000 70%) 84.5%/50%';
    }
}

export default Button;