import updatePassword from './updatePassword.js'

updatePassword('marti', '123456789', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }
})