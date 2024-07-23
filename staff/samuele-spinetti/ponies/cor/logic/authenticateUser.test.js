import authenticateUser from './authenticateUser.js'

authenticateUser('marti', '123456789', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User authenticated')
})