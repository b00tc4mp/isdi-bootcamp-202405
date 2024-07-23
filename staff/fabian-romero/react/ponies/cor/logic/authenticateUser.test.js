import authenticateUser from './authenticateUser.js'

authenticateUser('Valito', 'vali1234', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user authenticate')

})