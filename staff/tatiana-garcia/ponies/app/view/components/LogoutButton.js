class LogoutButton extends Component {

    constructor() {

        super(document.createElement('button'))

        this.setClassName('logout-button')
        this.setText('Logout')


    }

    onClick(callback) {
        this.container.onclick = callback
    }
}

//pagina Home linea 12