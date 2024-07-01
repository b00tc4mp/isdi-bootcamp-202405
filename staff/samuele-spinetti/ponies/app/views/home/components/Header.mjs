import Component from '../../Component.mjs'
import Image from '../../components/Image.mjs'
import Paragraph from '../../components/Paragraph.mjs'
import Button from '../../components/Button.mjs'

import logic from '../../../logic/index.mjs'

class Header extends Component {
    constructor() {
        super(document.createElement('header'))
        this.setClassName('header')

        const userName = new Paragraph
        userName.setClassName('header__username')
        this.add(userName)

        try {
            const name = logic.getUserName()

            userName.setText('Hello, ' + name + '!')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

        const self = this

        const homeAction = new Component(document.createElement('div'))
        homeAction.setClassName('home-action')
        this.add(homeAction)

        const homeButton = new Button
        homeButton.setClassName('home__button')
        homeAction.add(homeButton)

        const homeIcon = new Image
        homeIcon.setClassName('home__icon')
        homeIcon.setUrl('https://svgsilh.com/svg/309113.svg')
        homeButton.add(homeIcon)

        homeButton.onClick(() => self.onHomeClickCallback())

        const followsAction = new Component(document.createElement('div'))
        followsAction.setClassName('follow-action')
        this.add(followsAction)

        const followingButton = new Button
        followingButton.setClassName('follows__button')
        followsAction.add(followingButton)

        const followsIcon = new Image
        followsIcon.setClassName('follows__icon')
        followsIcon.setUrl('https://svgsilh.com/svg/297837-ffc107.svg')
        followingButton.add(followsIcon)

        followingButton.onClick(() => self.onFollowClickCallback())

        const favsAction = new Component(document.createElement('div'))
        favsAction.setClassName('favs-action')
        this.add(favsAction)

        const favsButton = new Button
        favsButton.setClassName('favs__button')
        favsAction.add(favsButton)

        const favsIcon = new Image
        favsIcon.setClassName('favs__icon')
        favsIcon.setUrl('https://svgsilh.com/svg/2103508.svg')
        favsButton.add(favsIcon)

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