function loginUser(username, password) {
    if (username.trim().length < 4) {
        throw new Error('invalid username');
    }

    if (password.trim().length < 8) {
        throw new Error('invalid password');
    }

    var users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    var user = users.find(function (user) {
        return user.username === username;
    })

    if (user.username === undefined) {
        throw new Error('username does not exist');
    }

    if (user.password !== password) {
        throw new Error('wrong password');
    }

    sessionStorage.username = username;
}