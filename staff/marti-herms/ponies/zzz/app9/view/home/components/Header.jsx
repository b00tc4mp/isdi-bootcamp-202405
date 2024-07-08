import LogoutButton from './buttons/LogoutButton';

import logic from '../../../logic/index.mjs';

const { Component } = React;

class Header extends Component {
    constructor() {
        super();
    }

    handleLogoutClicked() {
        try {
            logic.logoutUser();

            location.href = '../login';
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    render() {
        return <header className="header">
            <p className="user-name">{logic.getUserName()}</p>
            <LogoutButton />
        </header>
    }
}

export default Header;