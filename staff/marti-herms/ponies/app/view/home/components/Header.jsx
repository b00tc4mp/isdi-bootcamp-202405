import LogoutButton from './buttons/LogoutButton';

import logic from '../../../logic/index.mjs';

import Paragraph from '../../components/Paragraph';

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
        return <header className="Header">
            <Paragraph>{logic.getUserName()}</Paragraph>
            <LogoutButton />
        </header>
    }
}

export default Header;