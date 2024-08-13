import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import getAllPosts from './getAllPosts.js'
import searchItems from './searchItems.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    createPost,
    getAllPosts,
    searchItems,
    toggleFollowUser,
    getAllFollowingUserPosts
}

export default logic