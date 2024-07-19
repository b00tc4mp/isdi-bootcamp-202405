import authenticateUser from './authenticateUser.js'

authenticateUser('samu', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user authenticated')
})