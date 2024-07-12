import updateUser from "./updateUser.js";

const mariflower = {
    name: 'mari',
    surname: 'flower',
    email: 'mari@flower.com',
    username: 'maryFlower',
    password: 'maryflower1'
}

updateUser(user=> user.username === 'julitoCamelas', mariflower)

    