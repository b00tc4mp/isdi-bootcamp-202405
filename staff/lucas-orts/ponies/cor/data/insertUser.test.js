import insertUser from "./insertUser.js";

const user = {
    name: 'Caca',
    surname: 'Huete',
    email: 'caca@huete.com',
    username: 'cacahuete',
    password: '123123123'
}

insertUser(user, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User inserted')
})