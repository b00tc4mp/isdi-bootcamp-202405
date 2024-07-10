import logic from '../../../../logic/index.mjs';

const { Component } = React;

class LogoutButton extends Component {
    constructor() {
        super();
    }

    handleLogoutClick() {
        try {
            logic.logoutUser();

            location.href = '../login';
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    render() {
        return <button className="logout-button" onClick={this.handleLogoutClick}>Logout</button>
    }
}

export default LogoutButton