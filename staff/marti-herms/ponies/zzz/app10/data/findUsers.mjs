function findUsers(condition) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    const foundUsers = users.filter(condition);

    return foundUsers || null;
}

export default findUsers;