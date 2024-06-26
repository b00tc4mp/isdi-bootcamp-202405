class Header extends Component {
    constructor() {
        super(document.createElement('header'));
        this.container.className = 'header';

        const userName = new Paragraph('p');
        userName.container.style.color = 'white';
        this.add(userName);

        try {
            const name = logic.getUserName();

            userName.setText('Hello, ' + name + '!');
        } catch (error) {
            alert(error.message);
        }

        const logoutButton = new Button('logout-button');
        logoutButton.setText('Logout');
        this.add(logoutButton);

        logoutButton.onClick(() => {
            try {
                logic.logoutUser();

                location.href = '../login';
            } catch (error) {
                alert(error.message);
            }
        });
    }
}