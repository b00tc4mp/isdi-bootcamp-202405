import data from "../data/index.mjs";

const getUserPosts = (username) => {
    const user = data.findUser(user => user.username === username);

    if (user === null) {
        throw new Error('user not found');
    }

    return data.findPosts(post => user.yourPosts.includes(post.id));

}

export default getUserPosts