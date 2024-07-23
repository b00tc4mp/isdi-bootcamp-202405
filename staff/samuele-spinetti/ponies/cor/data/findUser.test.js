import findUser from './findUser.js'

const mari = {
    name: 'Marika',
    surname: 'Crocetti',
    email: 'marika@crocetti.com',
    username: 'mari',
    password: '123123123'
}

findUser(user => user.username === 'mari', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('User found', user)
})