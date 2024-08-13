import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import getAllPosts from './getAllPosts.js'
import searchItems from './searchItems.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import deletePost from './deletePost.js'
import createEvent from './createEvent.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    createPost,
    getAllPosts,
    searchItems,
    toggleFollowUser,
    getAllFollowingUserPosts,
    deletePost,
    createEvent
}

export default logic