import logic from '../../logic';

import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

import './Header.css';

function Header({ onLogout }) {
    const handleLogoutClick = () => {
        try {
            logic.logoutUser();

            onLogout();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <header className="Header">
        <Paragraph>{logic.getUserName()}</Paragraph>
        <Button className="Button--logout" onClick={handleLogoutClick}>Logout</Button>
    </header>
}

export default Header;