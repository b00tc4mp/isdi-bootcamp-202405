class Header extends Component {
    constructor() {
        super(document.createElement('header'))

        this.container.className = 'header'

        const userName = new Paragraph
        userName.setClassName('header__user-name')
        this.add(userName)

        try {
            const name = getUserName()

            userName.setText('Hello, ' + name + '!')
        } catch (error) {
            alert(error.message)
        }

        const logoutButton = new Button
        logoutButton.setClassName('logout-button')
        logoutButton.setInnerText('Logout')
        this.add(logoutButton)

        logoutButton.onClick = function () {
            try {
                logoutUser()

                location.href = '../login'
            } catch (error) {
                alert(error.message)
            }
        }
    }
}