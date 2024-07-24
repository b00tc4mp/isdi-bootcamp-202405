import findUser from "./findUser.js";

const userfound = findUser(user => user.name === 'Caca', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User found', user)
})

