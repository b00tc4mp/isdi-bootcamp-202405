import data from "../data"

const getFollowedUserPosts = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    const posts = user.following.map(followed => data.findUser(user => user.username === followed).yourPosts).flat(Infinity)

    const followedPosts = data.findPosts(post => posts.includes(post.id))


    return followedPosts
}

export default getFollowedUserPosts