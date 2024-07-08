import data from '../data/index.mjs'

const getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.name;
}

export default getUserName;