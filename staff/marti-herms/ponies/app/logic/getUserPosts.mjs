import data from "../data/index.mjs";

const getUserPosts = (user) => {
    if (typeof user === 'string') {
        user = data.findUser(userSearch => userSearch.username === user)
    }

    return user.yourPosts;

}

export default getUserPosts