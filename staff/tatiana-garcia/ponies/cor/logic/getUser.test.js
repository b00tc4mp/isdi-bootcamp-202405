import getUser from './getUser.js'

getUser("abtg", (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})

