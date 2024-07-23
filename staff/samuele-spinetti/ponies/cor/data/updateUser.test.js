import updateUser from './updateUser.js'

const user = {
    name: "Marti",
    surname: "Herms",
    email: "marti@herms.com",
    username: "marti",
    password: "123123123",
    favs: [],
    following: [
        "marti"
    ],
    avatar: "https//:jbvidbviobfiofobi"
}

updateUser(user => user.username === 'marti', user, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User updated')
})