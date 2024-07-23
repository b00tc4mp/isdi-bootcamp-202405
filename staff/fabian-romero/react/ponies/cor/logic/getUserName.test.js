import getUserName from './getUserName.js'

getUserName("Fabito", (error, user) => {
    if (error) {
        console.error(error)

        return
    }
    console.log(user)
})
