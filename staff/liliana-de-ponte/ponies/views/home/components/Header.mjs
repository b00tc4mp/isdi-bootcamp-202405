import Component from '../../Component.mjs'
import Paragraph from '../../components/Paragraph.mjs'
import Button from '../../components/Button.mjs'

import logic from '../../../logic/index.mjs'

class Header extends Component {
    constructor() {
        super(document.createElement('header'))
        this.setClassName('header')

        var userName = new Paragraph
        userName.setClassName('header__user-name')
        this.add(userName)

        try {
            var name = logic.getUserName()

            userName.setText('Hello, ' + name + '!')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

        const self = this

        const homeButton = new Button
        homeButton.setClassName('home-button')
        homeButton.setText('🏠')
        this.add(homeButton)

        homeButton.onClick(() => self.onHomeClickCallback())

        const followsButton = new Button
        followsButton.setClassName('follow-button')
        followsButton.setText('🪅')
        this.add(followsButton)

        followsButton.onClick(() => self.onFollowClickCallback())

        const favsButton = new Button
        favsButton.setClassName('favs-button')
        favsButton.setText('🏳️‍🌈')
        this.add(favsButton)

        favsButton.onClick(() => self.onFavsClickCallback())

        const logoutButton = new Button
        logoutButton.setClassName('logout-button')
        logoutButton.setText('Logout')
        this.add(logoutButton)

        logoutButton.onClick(() => {
            try {
                logic.logoutUser()

                location.href = '../login'
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })
    }

    onHomeClick(callback) {
        this.onHomeClickCallback = callback
    }

    onFavsClick(callback) {
        this.onFavsClickCallback = callback
    }

    onFollowClick(callback) {
        this.onFollowClickCallback = callback
    }
}

export default Header