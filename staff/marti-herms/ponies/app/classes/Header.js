class Header extends Component {
    constructor() {
        super(document.createElement('header'));
        this.container.className = 'header';

        const userName = new Paragraph('p');
        this.add(userName);

        try {
            const name = getUserName();

            userName.setInnerText('Hello, ' + name + '!');
        } catch (error) {
            alert(error.message);
        }

        const logoutButton = new Button('logout-button');
        logoutButton.setInnerText('Logout');
        this.add(logoutButton);

        logoutButton.onClick(() => {
            try {
                logoutUser();

                location.href = '../login';
            } catch (error) {
                alert(error.message);
            }
        });
    }
}