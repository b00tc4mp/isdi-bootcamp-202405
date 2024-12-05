import Component from './Component.mjs'
import Paragraph from './Paragraph.mjs'
import Button from './Button.mjs'

import logic from '../logic/index.mjs'


class Header extends Component {
    constructor() {
        super(document.createElement('header'));
        this.container.className = 'header';

        const profileButton = new Button();
        profileButton.setClassName('user-name');
        profileButton.setText(logic.getUserName());
        this.add(profileButton);

        profileButton.onClick(() => {
            try {
                const intervalID = logic.getIntervalID();
                clearInterval(intervalID);

                this.onProfileClickedCallback();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        })


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

    onProfileClicked(callback) {
        this.onProfileClickedCallback = callback;
    }
}

export default Header;