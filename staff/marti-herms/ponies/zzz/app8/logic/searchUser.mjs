import data from '../data/index.mjs'

const searchUser = (userSearch) => {
    return data.findUser(user => user.username === userSearch);
}

export default searchUser;