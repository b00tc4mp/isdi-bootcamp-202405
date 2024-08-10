import Component from '../../Component.mjs'
import Paragraph from '../../components/Paragraph.mjs'
import Button from '../../components/Button.mjs'

import logic from '../../../logic/index.mjs'

class Header extends Component {
    constructor() {
        super(document.createElement('header'))
        this.setClassName('header')

        const userName = new Paragraph
        userName.setClassName('header__user-name')
        this.add(userName)

        try {
            const name = logic.getUserName()

            userName.setText('Hello, ' + name + '!')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

        const self = this

        const homeButton = new Button
        homeButton.setText('🏠')
        homeButton.addClassName('Button--active')
        this.add(homeButton)

        homeButton.onClick(() => {
            homeButton.addClassName('Button--active')

            followingButton.removeClassName('Button--active')
            favsButton.removeClassName('Button--active')

            self.onHomeClickCallback()
        })

        const followingButton = new Button
        followingButton.setText('🪅')
        this.add(followingButton)

        followingButton.onClick(() => {
            followingButton.addClassName('Button--active')

            homeButton.removeClassName('Button--active')
            favsButton.removeClassName('Button--active')

            self.onFollowingClickCallback()

        })

        const favsButton = new Button
        favsButton.setText('🏳️‍🌈')
        this.add(favsButton)

        favsButton.onClick(() => {
            favsButton.addClassName('Button--active')

            followingButton.removeClassName('Button--active')
            homeButton.removeClassName('Button--active')

            self.onFavsClickCallback()
        })

        const logoutButton = new Button
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

    onFollowingClick(callback) {
        this.onFollowingClickCallback = callback
    }
}

export default Header