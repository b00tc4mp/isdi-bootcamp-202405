import data from "../data/index.mjs"

const getFollowedUserPosts = () => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    const followedPosts = user.following.map(followed => data.findUser(user => user.username === followed).yourPosts);

    return followedPosts;
}

export default getFollowedUserPosts