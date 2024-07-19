import data from '../data/index.js'

const USER_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

const updatePassword = (username, oldPassword, newPassword, newPasswordRepeat) => {
    if (!USER_REGEX.test(username)) throw new Error('invalid username')

    if (oldPassword.trim().length < 8) throw new Error('invalid password')

    if (newPassword.trim().length < 8) throw new Error('invalid password')

    if (oldPassword === newPassword) throw new Error('new password is equal to old password')

    if (newPassword !== newPasswordRepeat) throw new Error('passwords do not match')

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('user not found')

    if (oldPassword !== user.password) throw new Error('invalid password')

    user.password = newPassword

    data.updateUser(user => user.username === username, user)
}

export default updatePassword