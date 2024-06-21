class Header extends Component {
    constructor() {
        super(document.createElement('header'))

        this.container.className = 'header'

        var userName = new Paragraph
        userName.setClassName('header__user-name')
        this.add(userName)

        try {
            var name = getUserName()

            userName.setText('Hello, ' + name + '!')
        } catch (error) {
            alert(error.message)
        }
    }
}