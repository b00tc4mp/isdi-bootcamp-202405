import updateUser from "./updateUser.js"

const user = {
    name: "Peta",
    surname: "Zeta",
    email: "peta@zeta.com",
    username: "petazeta",
    password: "123123123"
}

updateUser(user => user.surname === 'Huete', user)