import Form from '../components/Form.mjs'
import Link from '../components/Link.mjs'

import logic from '../../logic/index.mjs'

const registerForm = new Form('form')

registerForm.onSubmit(event => {
    event.preventDefault()

    const nameInput = document.getElementById('name-input')
    const surnameInput = document.getElementById('surname-input')
    const emailInput = document.getElementById('email-input')
    const usernameInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')
    const passwordRepeatInput = document.getElementById('password2-input')

    const name = nameInput.value
    const surname = surnameInput.value
    const email = emailInput.value
    const username = usernameInput.value
    const password = passwordInput.value
    const passwordRepeat = passwordRepeatInput.value

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        alert('user successfully registered')

        location.href = '../login'
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
})

const loginLink = new Link('a')

loginLink.onClick(event => {
    event.preventDefault()

    location.href = '../login'
})