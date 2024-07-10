import Form from '../components/Form.mjs'
import Link from '../components/Link.mjs'

import logic from '../../logic/index.mjs'

const loginForm = new Form('form')

loginForm.onSubmit(event => {
    event.preventDefault()

    const usernameInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')

    const username = usernameInput.value
    const password = passwordInput.value

    try {
        logic.loginUser(username, password)

        location.href = '../home'
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
})

const registerLink = new Link('a')

registerLink.onClick(event => {
    event.preventDefault()

    location.href = '../register'
})