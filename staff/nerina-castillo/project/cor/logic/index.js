import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import logoutUser from './logoutUser.js'
import createPost from './createPost.js'
import getAllPosts from './getAllPosts.js'
import searchItems from './searchItems.js'
import toggleFollowUser from './toggleFollowUser.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    logoutUser,
    createPost,
    getAllPosts,
    searchItems,
    toggleFollowUser
}

export default logic