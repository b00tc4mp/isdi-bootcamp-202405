import insertUser from './insertUser.js'

const user = {
    name: "Carmen",
    surname: "Valdivia",
    email: "carmen@valdivia.com",
    username: "carmen",
    password: "123123123"
}

insertUser(user, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user inserted')
})