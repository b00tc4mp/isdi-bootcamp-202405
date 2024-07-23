import registerUser from './registerUser.js'

registerUser('Marti', 'Herms', 'marti@hrerms.com', 'marti21', '123456789', '123456789', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User registered')
})