import Component from './Component.mjs'
import Paragraph from './Paragraph.mjs'
import Button from './Button.mjs'
import logic from '../logic/index.mjs'


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
            console.error(error);

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
                console.error(error);

                alert(error.message);
            }
        });
    }
}

export default Header;