import data from "../data"

const getUserFollowers = (username) => {
    const user = data.findUser(user => user.username === username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.followers;
}

export default getUserFollowers;