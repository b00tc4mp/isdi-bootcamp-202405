import findUser from './findUser.js'

// const abt = {
//     name: "alberto",
//     surname: "garcia",
//     email: "abt@garcia.com",
//     username: "abtg",
//     password: "123123123"
// }

findUser(user => user.username === 'abtg', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user found', user)
})