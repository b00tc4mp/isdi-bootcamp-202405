import authenticateUser from './authenticateUser.js'

authenticateUser("tatig", "123123123", error => {
    if (error) {
        console.log(error)

        return
    }

    console.log('user authenticated')
})