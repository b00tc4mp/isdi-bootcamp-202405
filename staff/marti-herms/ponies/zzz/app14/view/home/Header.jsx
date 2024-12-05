import logic from '../../logic';

import { Component } from 'react';

import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

import './Header.css';

class Header extends Component {
    constructor() {
        super()

        this.state = { name: null }
    }

    componentDidMount() {
        try {
            logic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ name })
            })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleLogoutClick() {
        try {
            logic.logoutUser();

            onLogout();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    render() {
        return <header className="Header">
            <Paragraph>{this.state.name}</Paragraph>
            <Button className="Button--logout" onClick={this.handleLogoutClick.bind(this)}>Logout</Button>
        </header>
    }
}

export default Header;