import registerUser from './registerUser.js'

registerUser('Marti', 'Herms', 'marti@herms.com', 'marti', '123456789', '123456789', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})