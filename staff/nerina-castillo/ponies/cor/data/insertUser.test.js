import insertUser from "./insertUser.js";

const janfry = {
    name: 'Janfry',
    surname: 'Topera',
    email: 'janfry@topera.com',
    username: 'janfryTopera',
    password: 'janfrytopera1'
}

insertUser(janfry, error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user inserted')
})