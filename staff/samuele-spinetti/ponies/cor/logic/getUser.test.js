import getUser from './getUser.js'

getUser('samu', (error, user) => {
    if (error) {
        console.error(error.message)

        return
    }

    console.log(user)
})
