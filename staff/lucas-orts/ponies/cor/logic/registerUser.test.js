import registerUser from './registerUser.js'

registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})