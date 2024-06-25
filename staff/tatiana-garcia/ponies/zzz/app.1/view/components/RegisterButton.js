class RegisterButton extends Component {

    constructor() {

        super(document.createElement('button'))
        this.setClassName('register-button')
        this.setText('Register')
    }

    onClick(callback) {
        this.container.onclick = callback
    }
}