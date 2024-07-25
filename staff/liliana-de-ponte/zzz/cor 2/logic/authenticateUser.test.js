import authenticateUser from './authenticateUser.js'

authenticateUser("lilideponte", "123456789", error => {
    if (error) {
        console.log(error)

        return
    }

    console.log('user authenticated')
})