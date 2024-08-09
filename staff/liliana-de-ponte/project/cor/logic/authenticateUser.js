export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw nre
        })
}