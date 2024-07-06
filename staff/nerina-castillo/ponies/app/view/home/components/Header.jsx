import logic from '../../../logic/index.mjs'

import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'

const { Component } = React

class Header extends Component {
    constructor() {
        super()

        try {
            const name = logic.getUserName()  //obtiene el nombre de usuario

            this.state = { name }  //guarda el nombre de usuario encontrado
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleHomeClick() {
        console.debug('Header -> handleHomeClick')

        this.props.onHomeClick()  //lógica para manejar el click en Home
    }

    handlePoniesClick() {
        console.debug('Header -> handlePoniesClick')

        this.props.onPoniesClick()  //lógica para manejar el click en Ponies
    }

    handleFavsClick() {
        console.debug('Header -> handleFavsClick')

        this.props.onFavsClick()  //lógica para manejar el click en Favoritos
    }

    handleLogout() {  //lógica para manejar el click en Logout
        try {
            logic.logoutUser()

            location.href = '../login' //al hacer click en Logout te lleva a login
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    render() {
        return <header className="header">
            <Paragraph className={"header__user-name"} text={"Hello, " + this.state.name + "!"} />
            <Button className={"Button Button--active"} onClick={this.handleHomeClick.bind(this)} text={"🏚️"} />
            <Button className={"Button"} onClick={this.handlePoniesClick.bind(this)} text={"Following"} />
            <Button className={"Button"} onClick={this.handleFavsClick.bind(this)} text={"💫"} />
            <Button className={"logout-button"} onClick={this.handleLogout} text={"Logout"} />
        </header>
    }
}

export default Header