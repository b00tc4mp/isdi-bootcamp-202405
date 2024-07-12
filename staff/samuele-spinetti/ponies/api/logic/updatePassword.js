import data from '../data/index.js'

const updatePassword = (oldPassword, newPassword, username) => {
    if (oldPassword.trim().length < 8) throw new Error('Invalid password')

    if (newPassword.trim().length < 8) throw new Error('Invalid password')

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('User not found')

    if (oldPassword !== user.password) throw new Error('Invalid password')

    user.password = newPassword

    data.updateUser(user => user.username === username, user)
}

export default updatePassword