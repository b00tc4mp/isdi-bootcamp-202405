import editUserUsername from './editUserInfo'

const oldUsername = 'Eden'
const newUsername = 'Eden2'
const password = '11111111'

editUserUsername(oldUsername, newUsername, password, (error) => {
    if (error) {
        callback(new Error(error.message))

        return
    }
})