import insertUser from './insertUser.js'

const mari = {
    name: 'Marika',
    surname: 'Crocetti',
    email: 'marika@crocetti.com',
    username: 'mari',
    password: '123123123'
}

insertUser(mari, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User inserted')
})