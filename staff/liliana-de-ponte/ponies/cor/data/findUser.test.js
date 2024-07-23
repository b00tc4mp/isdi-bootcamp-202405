import findUser from "./findUser.js";

const peter = {
    name: "Peter",
    surname: "Pan",
    email: "peter@pan.com",
    username: "peterpan",
    password: "123456789",
}

findUser(user => user.username === 'peterpan', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user found', user)
})