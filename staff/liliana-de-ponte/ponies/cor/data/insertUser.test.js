import insertUser from './insertUser.js'

const frank = {
    name: 'Frank',
    surname: 'Quintero',
    email: 'frank@quintero.com',
    username: 'frankquintero',
    password: '123456789'
}

insertUser(frank, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user inserted')
})
