import data from '../data/index.mjs'

const getUserList = () => {
    const users = data.findUsers(() => true);

    if (users === null) {
        throw new Error('user not found');
    }

    const usernames = users.map(user => user.username);

    return usernames;
}

export default getUserList;