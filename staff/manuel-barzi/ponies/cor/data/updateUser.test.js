import updateUser from './updateUser.js'

const ale = {
    name: 'Alessandro',
    surname: 'Spinetti',
    email: 'alessandro@spinetti.com',
    username: 'ale',
    password: '123123123'
}

updateUser(user => user.username === 'marti', ale, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user updated')
})