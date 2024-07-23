import registerUser from './registerUser.js'

registerUser("Fabian", "Romero", "fabian@romero.com", "Fabito", "fabi1234", "fabi1234", (error, user) => {
    if (error) {
        console.error(error)


        return
    }

    console.log('Register user')
})


//email ya existe!