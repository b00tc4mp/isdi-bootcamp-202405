import data from '../data/index.js'

import validate from '../validate.js'

const updatePassword = (username, oldPassword, newPassword, newPasswordRepeat) => {
    validate.username(username)
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.password(newPasswordRepeat)

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('User not found')

    if (oldPassword !== user.password) throw new Error('Invalid password')

    user.password = newPassword

    data.updateUser(user => user.username === username, user)
}

export default updatePassword