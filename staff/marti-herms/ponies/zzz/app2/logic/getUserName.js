function getUserName() {
    var users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    var user = users.find(function (user) {
        return user.username === sessionStorage.username;
    })

    if (user === undefined) {
        throw new Error('user not found');
    }

    return user.name;
}