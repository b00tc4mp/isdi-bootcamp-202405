import getUser from './getUser.js'

getUser('Cacatua', 'Cacatua', (error, user) => {
    if (error) {
        console.error(error.message)

        return
    }

    console.log(user)
})