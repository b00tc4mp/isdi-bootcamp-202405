import updateUser from './updateUser.js'

const lucas = {
    name: 'Lucas',
    surname: 'Rodriguez',
    email: 'lucas@rodriguez.com',
    username: 'lucasrodriguez',
    password: '123456789'
}

updateUser(user => user.username === 'tatianagarcia', lucas, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user updated')
})
